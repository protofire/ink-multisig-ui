import { useCallback, useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { TxType } from "@/domain/repositores/ITxQueueRepository";
import { customReportError } from "@/utils/error";

export type TabTxTypes = "transfer" | "transaction";

export function useListTxQueue(address: string | undefined) {
  const [data, setData] = useState<TxType[] | null>(null);
  const [data2, setData2] = useState<{ [name: string]: TxType[] | undefined }>({
    transaction: undefined,
    transfer: undefined,
  });

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

        // const txType = Object.groupBy(result, (type) => type.__typename);
        // console.log("txType", txType);

        const transferData = result?.filter(
          (element) => element.__typename === "Transfer"
        );
        const transactionData = result?.filter(
          (element) => element.__typename === "Transaction"
        );

        if (result) {
          setData(result);
          setData2({
            transfer: transferData,
            transaction: transactionData,
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
    (key: TabTxTypes) => {
      console.log(key);
      if (data2 == null) return;
      return data2[key];
    },
    [data2]
  );

  return { data, listTxByType, isLoading, error };
}
