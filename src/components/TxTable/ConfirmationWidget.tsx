import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useDryRunExecution } from "@/hooks/useDryRunExecution";
import { ContractPromise } from "@/services/substrate/types";

import { useContractTx } from "../TxBuilderStepper/ProposeTxStep/useContractTx";

export function ConfirmationWidget({
  multisigContractPromise,
  txId,
}: {
  multisigContractPromise: ContractPromise;
  txId: string;
}) {
  // const [isLoading, setIsLoading] = useState(false);
  const { accountConnected } = usePolkadotContext();
  const theme = useTheme();

  // const approveDryRun = useGetDryRun(
  //   multisigContractPromise,
  //   "approveTx",
  //   accountConnected?.address
  // );

  // const rejectDryRun = useGetDryRun(
  //   multisigContractPromise,
  //   "approveTx",
  //   accountConnected?.address
  // );

  // const executeApproveDryRun = useCallback(async () => {
  //   console.log("handleDryRun");
  //   try {
  //     const dryRunResult = await approveDryRun.send([parseInt(txId)]);
  //     console.log(dryRunResult);
  //     if (!dryRunResult?.ok) {
  //       throw new Error(
  //         dryRunResult?.error.toString() ??
  //           "Error on executing the transaction."
  //       );
  //     }
  //   } catch (e) {
  //     const errorFormatted = customReportError(e);
  //     console.log(errorFormatted);
  //   }
  // }, [approveDryRun, txId]);

  // const executeRejectDryRun = useCallback(async () => {
  //   console.log("handleDryRun");
  //   try {
  //     const dryRunResult = await rejectDryRun.send([parseInt(txId)]);
  //     console.log(dryRunResult);
  //     if (!dryRunResult?.ok) {
  //       throw new Error(
  //         dryRunResult?.error.toString() ??
  //           "Error on executing the transaction."
  //       );
  //     }
  //   } catch (e) {
  //     const errorFormatted = customReportError(e);
  //     console.log(errorFormatted);
  //     //addNotification({ message: errorFormatted, type: "error" });
  //     //setIsLoading(false);
  //   }
  // }, [rejectDryRun, txId]);

  // useEffect(() => {
  //   executeApproveDryRun();
  //   executeRejectDryRun();
  // }, []);
  // // Create approveDryRun outside of the component
  const approveMessage = multisigContractPromise.abi.findMessage("approveTx");

  const failingApproveDryRun = useDryRunExecution({
    contractPromise: multisigContractPromise,
    message: approveMessage,
    params: [parseInt(txId)],
    substrateRegistry: multisigContractPromise.registry,
    addressCaller: accountConnected?.address,
    autoRun: false,
  });

  // useEffect(() => {
  //   if (approveDryRun.error !== undefined || approveDryRun.isRunning) {
  //     //setDryRunResult(false);
  //     return;
  //   }

  //   //setDryRunResult(true);
  // }, [approveDryRun.outcome, approveDryRun.error, approveDryRun.isRunning]);

  // useEffect(() => {
  //   if (approveDryRun.outcome !== undefined) {
  //     //console.log(approveMessage);
  //     console.log(approveDryRun);
  //     console.log(txId);
  //     //console.log(multisigContractPromise.address.toHuman());
  //   }
  // }, [approveDryRun]);

  // const rejectDryRun = useDryRunExecution({
  //   contractPromise: multisigContractPromise,
  //   message: rejectMessage || undefined,
  //   params: [txId],
  //   substrateRegistry: multisigContractPromise.registry,
  //   addressCaller: accountConnected?.address,
  //   autoRun: true,
  // });

  // useEffect(() => {
  //   if (error !== undefined || isRunning) {
  //     setDryRunResult(false);
  //     return;
  //   }

  //   setDryRunResult(true);
  // }, [outcome, error, isRunning, setDryRunResult]);

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

  return (
    <>
      <Box
        display="flex"
        flex={1}
        width="100%"
        mt={0}
        flexDirection="column" // Change to column layout
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor={theme.palette.grey.A100}
          p={3}
        >
          <Button
            variant="outlined"
            disabled={false}
            onClick={() => {
              //executeRejectDryRun();
              rejectTx.signAndSend([parseInt(txId)]);
            }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            disabled={false}
            onClick={() => {
              //executeApproveDryRun();
              approveTx.signAndSend([parseInt(txId)]);
            }}
          >
            Confirm
          </Button>
        </Box>
        <Typography variant="body1" mt={2}>
          Vote dry run outcome:
        </Typography>
        {/* <DryRunMessage
          outcome={approveDryRun.outcome}
          error={approveDryRun.error}
          isRunning={approveDryRun.isRunning}
        /> */}
        {/* <DryRunMessage
          outcome={rejectDryRun.outcome}
          error={rejectDryRun.error}
          isRunning={rejectDryRun.isRunning}
        /> */}
      </Box>
    </>
  );
}
