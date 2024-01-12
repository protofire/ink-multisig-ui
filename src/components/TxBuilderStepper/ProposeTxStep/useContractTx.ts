import { useCallback, useMemo, useState } from "react";
import { SignAndSend, Tx, useTx } from "useink";

import { useAppNotificationContext } from "@/components/AppToastNotification/AppNotificationsContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { AbiMessage, ContractPromise } from "@/services/substrate/types";
import { getOutcomeText } from "@/services/substrate/utils/contractExecResult";
import { getErrorMessage } from "@/utils/error";

interface Props {
  contractPromise: ContractPromise | undefined;
  abiMessage: AbiMessage | null | undefined;
  onCallback?: () => void;
  onTxHash?: (txHash: string) => void;
  onTxMined?: () => void;
}

interface UseContractTxReturn {
  tx: Tx<unknown>;
  outcome: string;
  error: string | undefined;
  signAndSend: SignAndSend;
}

export function useContractTx({
  contractPromise: contract,
  abiMessage,
  onCallback,
  onTxMined,
  onTxHash,
}: Props): UseContractTxReturn {
  const { network: chainId } = usePolkadotContext();
  const [outcome, setOutcome] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const { method } = abiMessage || { method: "" };
  const { addNotification } = useAppNotificationContext();

  const callContractArgs = useMemo(() => {
    return {
      chainContract: contract ? { contract, chainId } : undefined,
      method,
    };
  }, [chainId, contract, method]);

  const tx = useTx(callContractArgs.chainContract, callContractArgs.method);

  const signAndSend = useCallback(
    (inputData: unknown[] | undefined) => {
      setOutcome("");
      setError(undefined);
      tx.resetState();
      tx.signAndSend(inputData, undefined, (_result, _api, _error) => {
        const txHash = getOutcomeText(_result?.txHash.toHuman());

        if (txHash) {
          onTxHash?.(txHash);
        }
        if (_error) {
          const errorFormated = getErrorMessage(_error);
          setError(errorFormated);
          addNotification({ message: errorFormated, type: "error" });
          tx.resetState();
        } else if (_result?.isInBlock) {
          onTxMined?.();
        } else if (_result?.isCompleted) {
          const decodedOutput = getOutcomeText(_result.status.value.toHuman());
          setOutcome(decodedOutput);
          tx.resetState();
          onCallback?.();
        }
      });
    },
    [addNotification, onCallback, onTxMined, onTxHash, tx]
  );

  return { tx, outcome, error, signAndSend };
}
