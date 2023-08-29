import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { TransactionQueue } from "@/domain/TransactionQueue";
import { customReportError } from "@/utils/error";

export function useTransactionQueue(address: string | undefined) {
  const [data, setData] = useState<TransactionQueue[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { transactionQueueRepository } = useLocalDbContext();

  useEffect(() => {
    if (!address || !transactionQueueRepository) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = transactionQueueRepository.getQueue(address);
        setData(result);
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address, transactionQueueRepository]);

  return { data, isLoading, error };
}
