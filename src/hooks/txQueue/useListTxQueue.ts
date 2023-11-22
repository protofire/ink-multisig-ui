import { useEffect, useState } from "react";

import { graphSquidClient } from "@/config/squid";
import { TxQueueData } from "@/domain/repositores/ITxQueueRepository";
import { TxQueueRepository } from "@/services/squid/TxQueueRepository";
import { customReportError } from "@/utils/error";

const squidClient = graphSquidClient.getCurrentApolloClient();
const repository = new TxQueueRepository(squidClient);

export function useListTxQueue(address: string | undefined) {
  const [data, setData] = useState<TxQueueData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await repository.getQueue(address);
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
  }, [address]);

  return { data, isLoading, error };
}
