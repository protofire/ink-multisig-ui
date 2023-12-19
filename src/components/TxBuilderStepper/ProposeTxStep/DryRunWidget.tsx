import { Typography } from "@mui/material";
import { useEffect, useMemo } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Transaction } from "@/domain/Transaction";
import { AbiMessage, ContractPromise } from "@/services/substrate/types";

import { DryRunMessage } from "../MethodSelectorStep/DryRunMessage";
import { useDryRunExecution } from "../MethodSelectorStep/useDryRunExecution";

interface Props {
  contractMultisigPromise: ContractPromise;
  transferTxStruct: Transaction;
  proposeTxAbiMessage: AbiMessage;
  setDryRunResult: (result: boolean) => void;
  txStatus?: string;
}

export function DryRunMultisigWidget({
  contractMultisigPromise,
  transferTxStruct,
  setDryRunResult,
  proposeTxAbiMessage,
}: Props) {
  const { accountConnected } = usePolkadotContext();
  const _transferTxStruct = useMemo(
    () => [transferTxStruct],
    [transferTxStruct]
  );

  const { outcome, error, isRunning } = useDryRunExecution({
    contractPromise: contractMultisigPromise,
    message: proposeTxAbiMessage || undefined,
    params: _transferTxStruct,
    substrateRegistry: contractMultisigPromise.registry,
    addressCaller: accountConnected?.address,
    autoRun: true,
  });

  useEffect(() => {
    if (error !== undefined || isRunning) {
      setDryRunResult(false);
      return;
    }

    setDryRunResult(true);
  }, [outcome, error, isRunning, setDryRunResult]);

  return (
    <>
      <Typography variant="body1">
        Propose Transaction Dry run outcome:
      </Typography>
      <DryRunMessage outcome={outcome} error={error} isRunning={isRunning} />
    </>
  );
}
