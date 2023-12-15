import { Button, Typography } from "@mui/material";

import { UseArgValuesReturn } from "@/components/ArgumentForm/useArgValues";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import {
  AbiMessage,
  ContractPromise,
  Registry,
} from "@/services/substrate/types";

interface Props {
  contractMultisigPromise: ContractPromise;
  message: AbiMessage;
  substrateRegistry: Registry;
  params: UseArgValuesReturn["inputData"];
}

export function DryRunMultisigWidget({
  contractMultisigPromise,
  message,
  substrateRegistry,
  params,
}: Props) {
  const { accountConnected } = usePolkadotContext();
  const transferTxStruct = {
    address: contractMultisigPromise.address,
    selector: message.selector,
    input: params ? message.toU8a(params) : params,
    transferredValue: 0,
    gasLimit: 0,
    allowReentry: true,
  };
  //   const { outcome, error, isRunning, executeDryRun } = useDryRunExecution({
  //     contractPromise: contractMultisigPromise,
  //     message: "proposeTx",
  //     params: [transferTxStruct],
  //     substrateRegistry: substrateRegistry,
  //     autoRun: true,
  //     addressCaller: accountConnected?.address,
  //   });
  const dryRun = useGetDryRun(
    contractMultisigPromise,
    "proposeTx",
    accountConnected?.address
  );

  console.log("__error", dryRun);

  return (
    <>
      <Typography>Propose Transaction Dry run outcome:</Typography>
      {/* <DryRunMessage outcome={outcome} error={error} isRunning={isRunning} /> */}
      <Typography>Status:</Typography>
      <Button>DryRun</Button>
    </>
  );
}
