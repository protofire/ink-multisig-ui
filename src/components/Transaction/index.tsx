import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, CircularProgress } from "@mui/material";
import { BN, BN_ONE } from "@polkadot/util";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {
  decodeCallResult,
  toRegistryErrorDecoded,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
} from "useink/core";
import { ContractPromise, WeightV2 } from "useink/dist/core";

import { ChainExtended, getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { usePSPContractPromise } from "@/hooks/contractPromise/usePSPContractPromise";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { useNetworkApi } from "@/hooks/useNetworkApi";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import {
  getMessageInfo,
  splitTokenAmount,
  transformArgsToBytes,
} from "@/utils/blockchain";
import { customReportError } from "@/utils/error";

import { useAppNotificationContext } from "../AppToastNotification/AppNotificationsContext";
import { steps } from "./steps";
import { TransactionBox } from "./styled";

type TxData = {
  to: string;
  amount: string;
  token: string;
  chain: ChainExtended;
};

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);

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
          throw new Error(err.docs.join("\n"));
        }

        if (decodedData?.value.Err) {
          throw new Error(`Error: ${decodedData?.value.Err}`);
        }

        const result = await dryRun.send([transferTxStruct]);
        if (!result?.ok) {
          throw new Error(
            result?.error.toString() ?? "Error on executing the transaction."
          );
        }
        const gasRequired = (result?.ok &&
          result?.value.gasRequired) as WeightV2;

        const tx = proposeTx?.(
          {
            gasLimit: gasRequired,
          },
          Object.values(transferTxStruct)
        );
        const hash = await tx?.signAndSend(accountConnected?.address, {
          signer: accountConnected?.signer,
        });

        addNotification({
          message: `Transaction successfully sent. TxHash: ${hash?.toHuman()}`,
          type: "success",
        });
        router.replace(ROUTES.Assets);
      } catch (e) {
        const errorFormated = customReportError(e);
        addNotification({ message: errorFormated, type: "error" });
      } finally {
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
              onClick={() => setCurrentStep(currentStep - 1)}
              variant="outlined"
              disabled={isLoading}
            >
              <ArrowBackIcon color="primary" />
              Back
            </Button>
          )}
          <Button
            disabled={!!errors?.length || isLoading}
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
