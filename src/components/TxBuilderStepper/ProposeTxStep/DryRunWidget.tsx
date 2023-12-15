import { Button, Typography } from "@mui/material";
import { useMemo } from "react";

import { UseArgValuesReturn } from "@/components/ArgumentForm/useArgValues";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { AbiMessage, ContractPromise } from "@/services/substrate/types";
import { getMessageInfo } from "@/utils/blockchain";

import { DryRunMessage } from "../MethodSelectorStep/DryRunMessage";
import { useDryRunExecution } from "../MethodSelectorStep/useDryRunExecution";
import { useContractTx } from "./useContractTx";

interface Props {
  contractMultisigPromise: ContractPromise;
  message: AbiMessage;
  params: UseArgValuesReturn["inputData"];
}

export function DryRunMultisigWidget({
  contractMultisigPromise,
  message,
  params,
}: Props) {
  const { accountConnected } = usePolkadotContext();
  const transferTxStruct = useMemo(
    () => [
      {
        address: contractMultisigPromise.address,
        selector: message.selector,
        input: params,
        transferredValue: 0,
        gasLimit: 0,
        allowReentry: true,
      },
    ],
    [contractMultisigPromise.address, message.selector, params]
  );
  const proposeTxAbiMessage = getMessageInfo(
    contractMultisigPromise,
    "proposeTx"
  );
  const { outcome, error, isRunning } = useDryRunExecution({
    contractPromise: contractMultisigPromise,
    message: proposeTxAbiMessage || undefined,
    params: transferTxStruct,
    substrateRegistry: contractMultisigPromise.registry,
    addressCaller: accountConnected?.address,
    autoRun: true,
  });
  //   const proposeTx = contractMultisigPromise?.tx.proposeTx;
  //   const {
  //     caller,
  //     outcome: outcomeTx,
  //     error: errorTx,
  //   } = useContractCaller({
  //     contractPromise: contractMultisigPromise,
  //     abiMessage: proposeTxAbiMessage || undefined,
  //     substrateRegistry: contractMultisigPromise.registry,
  //   });
  const {
    signAndSend,
    tx,
    outcome: outcomeTx,
  } = useContractTx({
    contractPromise: contractMultisigPromise,
    abiMessage: proposeTxAbiMessage,
  });

  //   const dryRun = useGetDryRun(
  //     contractMultisigPromise,
  //     "proposeTx",
  //     accountConnected?.address
  //   );

  console.log("__outcomeTx", tx);

  return (
    <>
      <Typography>Propose Transaction Dry run outcome:</Typography>
      <DryRunMessage outcome={outcome} error={error} isRunning={isRunning} />
      <Typography>Status:</Typography>
      <Button onClick={() => signAndSend(transferTxStruct, { gasLimit: 0 })}>
        Execute
      </Button>
      <Typography>{outcomeTx}</Typography>
    </>
  );
}
