import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {
  decodeCallResult,
  toRegistryErrorDecoded,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
} from "useink/core";
import { ContractPromise, RegistryError, WeightV2 } from "useink/dist/core";

import { ChainExtended, getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { usePSPContractPromise } from "@/hooks/contractPromise/usePSPContractPromise";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { useNetworkApi } from "@/hooks/useNetworkApi";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { getIfSpecialError } from "@/services/substrate/utils/specialErrorWrapper";
import {
  getMessageInfo,
  splitTokenAmount,
  transformArgsToBytes,
} from "@/utils/blockchain";
import { MAX_CALL_WEIGHT, PROOFSIZE } from "@/utils/bn";
import { customReportError } from "@/utils/error";

import { useAppNotificationContext } from "../AppToastNotification/AppNotificationsContext";
import { steps } from "./steps";
import { TransactionBox } from "./styled";

type TxData = {
  to: string;
  amount: string;
  token: string | undefined;
  chain: ChainExtended;
};

export const Transaction = ({ pspToken }: { pspToken?: string }) => {
  const [txData, setTxData] = useState<TxData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const api = useNetworkApi();
  const router = useRouter();
  const { addNotification } = useAppNotificationContext();
  const { accountConnected, network } = usePolkadotContext();
  const { xSignerSelected } = useGetXsignerSelected();
  const { multisigContractPromise } = useMultisigContractPromise(
    xSignerSelected?.address
  );
  const { pSPContractPromise } = usePSPContractPromise(
    pspToken ?? (txData?.token as string)
  );

  const { assetRepository } = useLocalDbContext();
  const dryRun = useGetDryRun(multisigContractPromise?.contract, "proposeTx");
  const isLastStep = currentStep === steps.length - 1;
  const Component = steps[currentStep].Component;

  const resetTxData = () => {
    setTxData((prevTxData) => {
      const updatedData = {
        ...prevTxData,
        to: "",
        amount: "0 SBY",
        token: "",
      } as TxData;
      return updatedData;
    });
    setErrors([]);
  };

  const setField = useCallback((field: string, value: unknown) => {
    setTxData((prevTxData) => {
      const updatedData = {
        ...prevTxData,
        [field]: value,
      } as TxData;
      return updatedData;
    });
  }, []);

  useEffect(() => {
    const chain = getChain(network);
    setField("chain", chain);
  }, [network, setField]);

  useEffect(() => {
    if (pspToken) {
      setField("token", pspToken);
    }
  }, [pspToken, setField]);

  const formatErrorMsg = (err: RegistryError) => {
    const parsedError = err?.name
      ? getIfSpecialError(err.name)
      : "Transaction will be reverted due to unknown error";
    return parsedError;
  };

  const handleNext = async () => {
    if (isLastStep) {
      const amount = Number(splitTokenAmount(txData?.amount)?.amount ?? 0);
      if (!txData?.to || !accountConnected?.address) return;
      try {
        setIsLoading(true);
        const contract = txData.token
          ? pSPContractPromise?.contract
          : multisigContractPromise?.contract;
        const decimals = txData.token
          ? assetRepository.getAssetByAddress(txData.token)?.decimals
          : api.apiPromise?.registry.chainDecimals[0];
        const convertedValue = BigInt(amount * 10 ** (decimals ?? 18));
        const args: unknown[] = [txData.to, convertedValue];
        if (txData.token) {
          args.push([]);
        }
        const proposeTx = multisigContractPromise?.contract.tx.proposeTx;

        const methodName = txData.token ? "psp22::transfer" : "transfer";
        const input = transformArgsToBytes(
          contract as ContractPromise,
          methodName,
          args
        );
        const abiMessage = getMessageInfo(
          contract as ContractPromise,
          methodName
        );
        const selector = abiMessage?.selector;

        const transferTxStruct = {
          address: txData.token || xSignerSelected?.address,
          selector,
          input,
          transferredValue: 0,
          gasLimit: 0,
          allowReentry: !txData.token,
        };

        const dryRunData = await contract?.query[methodName](
          xSignerSelected?.address as string,
          {
            gasLimit: api.apiPromise?.registry.createType("WeightV2", {
              refTime: MAX_CALL_WEIGHT,
              proofSize: PROOFSIZE,
            }) as WeightV2,
          },
          ...args
        );
        const err = toRegistryErrorDecoded(
          api.apiPromise?.registry,
          dryRunData?.result
        );
        const decodedData = decodeCallResult(
          dryRunData?.result,
          abiMessage,
          contract?.abi.registry
        );

        if (err) {
          throw new Error(formatErrorMsg(err));
        }

        if (decodedData?.value.Err) {
          throw new Error(`Error: ${decodedData?.value.Err}`);
        }

        const result = await dryRun.send([transferTxStruct]);

        if (!result?.ok) {
          const parsedError = formatErrorMsg(result?.error);
          throw new Error(parsedError ?? "Error on executing the transaction.");
        }
        const gasRequired = (result?.ok &&
          result?.value.gasRequired) as WeightV2;

        const tx = proposeTx?.(
          {
            gasLimit: gasRequired,
          },
          Object.values(transferTxStruct)
        );

        await tx?.signAndSend(
          accountConnected?.address,
          {
            signer: accountConnected?.signer,
          },
          ({ status }) => {
            if (status.isInBlock) {
              setIsLoading(false);
              addNotification({
                message: "Transaction successfully sent.",
                type: "success",
              });
              router.replace(ROUTES.Transactions);
            }
          }
        );
      } catch (e) {
        const errorFormated = customReportError(e);
        addNotification({ message: errorFormated, type: "error" });
        setIsLoading(false);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <TransactionBox p={4}>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Component
          {...txData}
          errors={errors}
          setErrors={setErrors}
          setField={setField}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          flexDirection={isLastStep ? "row" : "row-reverse"}
          mt={6}
        >
          {currentStep > 0 && (
            <Button
              onClick={() => {
                resetTxData();
                setCurrentStep(currentStep - 1);
              }}
              variant="outlined"
              disabled={isLoading}
            >
              <ArrowBackIcon color="primary" />
              Back
            </Button>
          )}
          <Button
            disabled={!!errors.filter(Boolean)?.length || isLoading}
            sx={{ width: 134 }}
            onClick={handleNext}
            variant="contained"
            color="primary"
          >
            {isLastStep ? "Execute" : "Next"}
            {isLoading && <CircularProgress color="secondary" size={20} />}
          </Button>
        </Box>
      </Box>
    </TransactionBox>
  );
};
