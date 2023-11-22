import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { TxQueueData } from "@/domain/repositores/ITxQueueRepository";
import { customReportError } from "@/utils/error";

export function useListTxQueue(address: string | undefined) {
  const [data, setData] = useState<TxQueueData | null>(null);
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
        if (result) {
          setData(result);
        }
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address, txQueueRepository]);

  return { data, isLoading, error };
}
