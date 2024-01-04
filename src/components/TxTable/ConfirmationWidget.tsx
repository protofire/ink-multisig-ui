import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";

import { LoadingButton } from "@/components/common/LoadingButton";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useDryRunExecution } from "@/hooks/useDryRunExecution";
import { TWO_SECONDS, useRecentlyClicked } from "@/hooks/useRecentlyClicked";
import { ContractPromise } from "@/services/substrate/types";
import { shouldDisable } from "@/services/useink/utils";

import { DryRunMessage } from "../TxBuilderStepper/MethodSelectorStep/DryRunMessage";
import { useContractTx } from "../TxBuilderStepper/ProposeTxStep/useContractTx";

interface Props {
  multisigContractPromise: ContractPromise;
  txId: string;
  expanded: boolean;
}

export function ConfirmationWidget({
  multisigContractPromise,
  txId,
  expanded,
}: Props) {
  const approveMessage = useMemo(
    () => multisigContractPromise.abi.findMessage("approveTx"),
    [multisigContractPromise.abi]
  );
  const { accountConnected } = usePolkadotContext();
  const { outcome, error, isRunning, executeDryRun } = useDryRunExecution({
    contractPromise: multisigContractPromise,
    message: approveMessage,
    params: [parseInt(txId)],
    addressCaller: accountConnected?.address,
    autoRun: expanded,
    successOutcome: "You can vote",
    failureOutcome: "You can't vote",
  });

  const { recentlyClicked: recentlyClickedApprove, ref: refButtonApprove } =
    useRecentlyClicked(TWO_SECONDS);
  const { recentlyClicked: recentlyClickedReject, ref: refButtonReject } =
    useRecentlyClicked(TWO_SECONDS);
  const theme = useTheme();

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
    executeDryRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountConnected?.address, approveTx.outcome, rejectTx.outcome]);

  const _isLoadingApprove =
    recentlyClickedApprove || shouldDisable(approveTx.tx);
  const _isLoadingReject = recentlyClickedReject || shouldDisable(rejectTx.tx);

  return (
    <>
      <Box
        display="flex"
        flex={1}
        width="100%"
        mt={0}
        flexDirection="column" // Change to column layout
      >
        <DryRunMessage
          outcome={error ? `${outcome}: ${error}` : outcome}
          error={error}
          isRunning={isRunning}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor={theme.palette.grey.A100}
          p={3}
        >
          <LoadingButton
            ref={refButtonReject}
            variant="outlined"
            disabled={
              outcome === undefined ||
              error !== undefined ||
              isRunning ||
              _isLoadingReject ||
              _isLoadingApprove
            }
            onClick={() => {
              rejectTx.signAndSend([parseInt(txId)]);
            }}
            isLoading={_isLoadingReject}
          >
            Reject
          </LoadingButton>
          <LoadingButton
            ref={refButtonApprove}
            variant="contained"
            disabled={
              outcome === undefined ||
              error !== undefined ||
              isRunning ||
              _isLoadingApprove ||
              _isLoadingReject
            }
            isLoading={_isLoadingApprove}
            onClick={() => {
              approveTx.signAndSend([parseInt(txId)]);
            }}
          >
            Confirm
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
}
