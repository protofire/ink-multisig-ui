import { useCallback, useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import {
  TransactionType,
  TransferType,
  TxQueueType,
} from "@/domain/repositores/ITxQueueRepository";
import { customReportError } from "@/utils/error";

export type TxTypes = "transfer" | "transaction";

export function useListTxQueue(address: string | undefined) {
  const [data, setData] = useState<TxQueueType[] | null>(null);
  const [data2, setData2] = useState<{
    transfer: TransferType[];
    transaction: TransactionType[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { txQueueRepository } = useLocalDbContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await txQueueRepository.getQueue(address);
        console.log("result", result);

        const transferData = result?.filter(
          (element) => element.__typename === "Transfer"
        );
        const transactionData = result?.filter(
          (element) => element.__typename === "Transaction"
        );

        if (result) {
          setData(result);
          setData2({
            transfer: transferData as TransferType[],
            transaction: transactionData as TransactionType[],
          });
        }
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().finally(() => {
      setIsLoading(false);
    });
  }, [address, txQueueRepository]);

  const listTxByType = useCallback(
    (key: TxTypes) => {
      console.log(key);
      if (data2 == null) return;
      return data2[key];
    },
    [data2]
  );

  return { data, listTxByType, isLoading, error };
}
