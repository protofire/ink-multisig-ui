import { useEffect, useState } from "react";

import { Tx } from "@/domain/repositores/ITxQueueRepository";
import { squidClient } from "@/pages/_app";
import { TxQueueRepository } from "@/services/squid/TxQueueRepository";
import { customReportError } from "@/utils/error";

const repository = new TxQueueRepository(squidClient);

export function useListTxQueue(address: string | undefined) {
  const [data, setData] = useState<Tx[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await repository.getQueue(address as string);
        console.log("result", result);
        if (result) {
          setData([...result.transactions] as unknown as Tx[]);
        }
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address]);

  return { data, isLoading, error };
}
