import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { ContractPromise } from "@/services/substrate/types";
import { shouldDisable } from "@/services/useink/utils";
import { customReportError } from "@/utils/error";

import { DryRunMessage } from "../TxBuilderStepper/MethodSelectorStep/DryRunMessage";
import { useContractTx } from "../TxBuilderStepper/ProposeTxStep/useContractTx";

export function ConfirmationWidget({
  multisigContractPromise,
  txId,
}: {
  multisigContractPromise: ContractPromise;
  txId: string;
}) {
  const [outcome, setOutcome] = useState<string>();
  const [error, setError] = useState<string>();
  const [isRunning, setIsRunning] = useState(true);
  const { accountConnected } = usePolkadotContext();
  const theme = useTheme();

  const reset = () => {
    setOutcome(undefined);
    setError(undefined);
    setIsRunning(true);
  };

  const approveDryRun = useGetDryRun(
    multisigContractPromise,
    "approveTx",
    accountConnected?.address
  );

  const executeApproveDryRun = useCallback(async () => {
    setIsRunning(true);
    try {
      const dryRunResult = await approveDryRun.send([parseInt(txId)]);
      if (!dryRunResult?.ok) {
        throw new Error(
          dryRunResult?.error.toString() ??
            "Error on executing the transaction."
        );
      } else if (dryRunResult.value.decoded.Err) {
        setOutcome("You can't vote: " + dryRunResult.value.decoded.Err);
        setError(dryRunResult.value.decoded.Err);
      } else {
        setOutcome("You can vote");
      }
    } catch (e) {
      const errorFormatted = customReportError(e);
      setError(errorFormatted);
    } finally {
      setIsRunning(false);
    }
  }, [approveDryRun, txId]);

  const approveTx = useContractTx({
    contractPromise: multisigContractPromise,
    abiMessage: multisigContractPromise.abi.findMessage("approveTx"),
    onTxHash: (txHash) => {
      console.log("onApproveTxHash", txHash);
    },
  });

  const rejectTx = useContractTx({
    contractPromise: multisigContractPromise,
    abiMessage: multisigContractPromise.abi.findMessage("rejectTx"),
    onTxHash: (txHash) => {
      console.log("onRejectTxHash", txHash);
    },
  });

  useEffect(() => {
    reset();
    executeApproveDryRun();
  }, [
    accountConnected?.address,
    approveTx.outcome,
    executeApproveDryRun,
    rejectTx.outcome,
  ]);

  const isLoading = shouldDisable(approveTx.tx) || shouldDisable(rejectTx.tx);

  return (
    <>
      <Box
        display="flex"
        flex={1}
        width="100%"
        mt={0}
        flexDirection="column" // Change to column layout
      >
        <DryRunMessage outcome={outcome} error={error} isRunning={isRunning} />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor={theme.palette.grey.A100}
          p={3}
        >
          <Button
            variant="outlined"
            disabled={
              outcome === undefined ||
              error !== undefined ||
              isRunning ||
              isLoading
            }
            onClick={() => {
              rejectTx.signAndSend([parseInt(txId)]);
            }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            disabled={
              outcome === undefined ||
              error !== undefined ||
              isRunning ||
              isLoading
            }
            onClick={() => {
              approveTx.signAndSend([parseInt(txId)]);
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </>
  );
}
