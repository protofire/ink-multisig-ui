import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { BlockchainIssuedEvent } from "@/domain/BlockchainIssuedEvent";
import { LocalMultisigEvents } from "@/domain/events/LocalMultisigEvents";
import { MultisigContractEvents } from "@/domain/events/MultisigContractEvents";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";

import { TransactionWithAction } from ".";

interface Props {
  data: TransactionProposedItemUi[] | undefined;
  callback: () => void;
}

interface UseRemovedTxIdsReturn {
  transactionToProcess: TransactionWithAction | undefined;
}

export function useRemovedTxIds({
  data,
  callback,
}: Props): UseRemovedTxIdsReturn {
  const [transactionToProcess, setTransactionWillBeExecuted] =
    useState<UseRemovedTxIdsReturn["transactionToProcess"]>();
  const { localMultisigEventRepo } = useLocalDbContext();
  const [newEvent, setNewEvent] = useState<BlockchainIssuedEvent | undefined>();

  useEventListenerCallback(LocalMultisigEvents.eventAdded, () =>
    setNewEvent(
      localMultisigEventRepo
        .getEvents()
        .find(
          (event) =>
            event.name === MultisigContractEvents.TransactionExecuted ||
            event.name === MultisigContractEvents.TransactionCancelled
        )
    )
  );
  useEffect(() => {
    if (!data || !newEvent) return;

    const willBeExecuted = data.find((tx) => tx.txId === newEvent.args[0]);
    if (willBeExecuted) {
      setTransactionWillBeExecuted({
        ...willBeExecuted,
        actionName: newEvent.name,
      });
      callback();
    }
  }, [callback, data, localMultisigEventRepo, newEvent]);

  return { transactionToProcess };
}
