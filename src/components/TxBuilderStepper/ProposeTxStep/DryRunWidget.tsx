import { Button, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Transaction } from "@/domain/Transaction";
import { ContractPromise } from "@/services/substrate/types";
import { getMessageInfo } from "@/utils/blockchain";

import { DryRunMessage } from "../MethodSelectorStep/DryRunMessage";
import { useDryRunExecution } from "../MethodSelectorStep/useDryRunExecution";

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
  const [txHash, setTxHash] = useState<any>();

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

  // const {
  //   signAndSend,
  //   tx,
  //   outcome: outcomeTx,
  // } = useContractTx({
  //   contractPromise: contractMultisigPromise,
  //   abiMessage: proposeTxAbiMessage,
  // });

  const proposeTx = contractMultisigPromise.tx.proposeTx;
  const tx = proposeTx?.(
    {
      gasLimit: gasRequired,
    },
    Object.values(_transferTxStruct[0])
  );

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
        onClick={async () => {
          if (!accountConnected) return;

          const hash = await tx?.signAndSend(accountConnected?.address, {
            signer: accountConnected?.signer,
          });

          hash && setTxHash(hash.toHuman());
        }}
      >
        Execute
      </Button>
      <Typography>{txHash}</Typography>
    </>
  );
}
