import { useEffect, useRef, useState } from "react";

import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";

type TxIds = TransactionProposedItemUi["txId"][];

export function useRemovedTxIds(
  newData: TransactionProposedItemUi[] | undefined
): {
  removedTxIds: TxIds;
} {
  const [removedTxIds, setRemovedTxIds] = useState<TxIds>([]);
  const previousDataRef = useRef<TransactionProposedItemUi[]>([]);

  useEffect(() => {
    if (!newData) return;

    const previousData = previousDataRef.current;
    const removedIds = previousData
      .filter((item) => !newData.some((newItem) => newItem.txId === item.txId))
      .map((item) => item.txId);

    setRemovedTxIds(removedIds);

    previousDataRef.current = newData;
  }, [newData]);

  return { removedTxIds };
}
