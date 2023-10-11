import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useNetworkApi } from "@/hooks/useNetworkApi";
import { splitTokenAmount } from "@/utils/blockchain";
import { customReportError } from "@/utils/error";

import { useAppNotificationContext } from "../AppToastNotification/AppNotificationsContext";
import { steps } from "./steps";

type TxData = {
  to: string;
  amount: string;
  token: string;
};

export const Transaction = () => {
  const theme = useTheme();

  const [txData, setTxData] = useState<TxData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const api = useNetworkApi();
  const { addNotification } = useAppNotificationContext();
  const { accountConnected } = usePolkadotContext();

  const isLastStep = currentStep === steps.length - 1;

  const Component = steps[currentStep].Component;
  const setField = (field: string, value: string) => {
    const data = {
      ...txData,
      [field]: value,
    } as TxData;
    setTxData(data);
  };

  const handleNext = async () => {
    if (isLastStep) {
      const amount = Number(splitTokenAmount(txData?.amount)?.amount ?? 0);
      if (!txData?.to || !accountConnected?.address) return;
      try {
        setIsLoading(true);
        const decimals = api.apiPromise?.registry.chainDecimals[0] ?? 18;
        const convertedValue = BigInt(amount * 10 ** decimals);
        const transfer = api.apiPromise?.tx.balances.transfer(
          txData.to,
          convertedValue
        );
        await transfer?.signAndSend(accountConnected?.address, {
          signer: accountConnected?.signer,
        });
        addNotification({
          message: "Transaction successfully sent.",
          type: "success",
        });
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
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      sx={{ background: theme.palette.grey.A100 }}
      justifyContent="center"
      p={4}
    >
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
            >
              <ArrowBackIcon color="primary" />
              Back
            </Button>
          )}
          <Button
            disabled={!!errors?.length}
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
    </Box>
  );
};
