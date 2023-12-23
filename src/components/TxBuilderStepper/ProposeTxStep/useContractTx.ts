import { useCallback, useMemo, useState } from "react";
import {
  SignAndSend,
  Tx,
  useEvents,
  useEventSubscription,
  useTx,
} from "useink";

import { useAppNotificationContext } from "@/components/AppToastNotification/AppNotificationsContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { AbiMessage, ContractPromise } from "@/services/substrate/types";
import { getOutcomeText } from "@/services/substrate/utils/contractExecResult";
import { getErrorMessage } from "@/utils/error";

type EventPayload = {
  createdAt: number;
  name: string;
  args: unknown[];
};

type Event = {
  id: string;
} & EventPayload;

interface Props {
  contractPromise: ContractPromise | undefined;
  abiMessage: AbiMessage | null | undefined;
  onCallback?: () => void;
  onTxHash?: (txHash: string) => void;
}

interface UseContractTxReturn {
  tx: Tx<unknown>;
  outcome: string;
  error: string | undefined;
  events: Event[];
  signAndSend: SignAndSend;
}

export function useContractTx({
  contractPromise: contract,
  abiMessage,
  onCallback,
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

  useEventSubscription(callContractArgs.chainContract);
  const { events } = useEvents(
    callContractArgs.chainContract?.contract.address || undefined,
    [callContractArgs.method]
  );

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
        } else if (_result?.isCompleted) {
          const decodedOutput = getOutcomeText(_result.status.value.toHuman());
          setOutcome(decodedOutput);
          tx.resetState();
          onCallback?.();
        }
      });
    },
    [addNotification, onCallback, onTxHash, tx]
  );

  return { tx, outcome, error, events, signAndSend };
}
