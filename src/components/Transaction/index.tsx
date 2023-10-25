import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { WeightV2 } from "useink/dist/core";

import { ChainExtended, getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { useNetworkApi } from "@/hooks/useNetworkApi";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { splitTokenAmount } from "@/utils/blockchain";
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

export const Transaction = () => {
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
  const dryRun = useGetDryRun(multisigContractPromise?.contract, "proposeTx");

  const isLastStep = currentStep === steps.length - 1;
  const Component = steps[currentStep].Component;

  const setField = useCallback(
    (field: string, value: unknown) => {
      const data = {
        ...txData,
        [field]: value,
      } as TxData;
      setTxData(data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(txData)]
  );

  useEffect(() => {
    const chain = getChain(network);
    setField("chain", chain);
  }, [network, setField]);

  const handleNext = async () => {
    if (isLastStep) {
      const amount = Number(splitTokenAmount(txData?.amount)?.amount ?? 0);
      if (!txData?.to || !accountConnected?.address) return;
      try {
        setIsLoading(true);
        const decimals = api.apiPromise?.registry.chainDecimals[0] ?? 18;
        const convertedValue = BigInt(amount * 10 ** decimals);
        const proposeTx = multisigContractPromise?.contract.tx.proposeTx;
        const transferTx = multisigContractPromise?.contract.tx.transfer;
        const selector = transferTx?.meta.selector;
        const accountId = api.apiPromise
          ?.createType("AccountId", txData.to)
          .toU8a();
        const balance = api.apiPromise
          ?.createType("Balance", convertedValue)
          .toU8a();

        if (!accountId || !balance) return;
        const input = new Uint8Array(accountId.length + balance.length);
        input.set(accountId, 0);
        input.set(balance, accountId.length);

        const transferTxStruct = {
          address: xSignerSelected?.address,
          selector: selector,
          input: Array.from(input),
          transferredValue: 0,
          gasLimit: 0,
          allowReentry: true,
        };

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
