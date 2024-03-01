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

interface UsePendingTxRemovalReturn {
  pendingTransaction: TransactionWithAction | undefined;
}

/**
 * Listen blockchain events to identify transactions recently executed
 * or cancelled that are not yet indexed in database.
 *
 * It uses events to detect changes and returns the ID of the transaction pending
 * to be removed from the queue of proposed transactions.
 */
export function usePendingTxRemoval({
  data,
  callback,
}: Props): UsePendingTxRemovalReturn {
  const [pendingTransaction, setPendingTransaction] = useState<
    UsePendingTxRemovalReturn["pendingTransaction"] | undefined
  >();
  const { localMultisigEventRepo } = useLocalDbContext();
  const [newEvent, setNewEvent] = useState<BlockchainIssuedEvent | undefined>();

  useEventListenerCallback(LocalMultisigEvents.eventAdded, () => {
    const latestEvent = localMultisigEventRepo
      .getEvents()
      .find(
        (event) =>
          event.name === MultisigContractEvents.TransactionExecuted ||
          event.name === MultisigContractEvents.TransactionCancelled
      );

    if (latestEvent && latestEvent !== newEvent) {
      setNewEvent(latestEvent);
    }
  });

  useEffect(() => {
    if (!data || !newEvent) return;

    const willBeExecuted = data.find((tx) => tx.txId === newEvent.args[0]);
    if (willBeExecuted && willBeExecuted !== pendingTransaction) {
      setPendingTransaction({
        ...willBeExecuted,
        actionName: newEvent.name,
      });
      callback();
      setNewEvent(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, data, localMultisigEventRepo, newEvent]);

  return { pendingTransaction };
}
