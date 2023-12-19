import { Button, Typography } from "@mui/material";
import { useMemo } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Transaction } from "@/domain/Transaction";
import { ContractPromise } from "@/services/substrate/types";
import { getMessageInfo } from "@/utils/blockchain";

import { DryRunMessage } from "../MethodSelectorStep/DryRunMessage";
import { useDryRunExecution } from "../MethodSelectorStep/useDryRunExecution";
import { useContractTx } from "./useContractTx";

interface Props {
  contractMultisigPromise: ContractPromise;
  transferTxStruct: Transaction;
}

export function DryRunMultisigWidget({
  contractMultisigPromise,
  transferTxStruct,
}: Props) {
  const { accountConnected } = usePolkadotContext();
  const _transferTxStruct = useMemo(
    () => [transferTxStruct],
    [transferTxStruct]
  );

  // const transferTxStruct = useMemo(
  //   () => [
  //     {
  //       address: selectedContractAddress,
  //       selector: message.selector,
  //       input: params,
  //       transferredValue: 0,
  //       gasLimit: 0,
  //       allowReentry: true,
  //     },
  //   ],
  //   [message, params, selectedContractAddress]
  // );

  const proposeTxAbiMessage = getMessageInfo(
    contractMultisigPromise,
    "proposeTx"
  );
  const { outcome, error, isRunning, gasRequired } = useDryRunExecution({
    contractPromise: contractMultisigPromise,
    message: proposeTxAbiMessage || undefined,
    params: _transferTxStruct,
    substrateRegistry: contractMultisigPromise.registry,
    addressCaller: accountConnected?.address,
    autoRun: true,
  });

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

  console.log("DryRun", outcome, error);
  console.log("__outcomeTx", tx);

  return (
    <>
      <Typography>Propose Transaction Dry run outcome:</Typography>
      <DryRunMessage outcome={outcome} error={error} isRunning={isRunning} />
      <Typography>Status:</Typography>
      <Button
        onClick={() => {
          signAndSend(_transferTxStruct, {
            gasLimit: gasRequired,
          });
        }}
      >
        Execute
      </Button>
      <Typography>{outcomeTx}</Typography>
    </>
  );
}
