import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { ChainId } from "@/services/useink/types";
import { customReportError } from "@/utils/error";

interface Props {
  walletAddress: string | undefined;
  networkId: ChainId | undefined;
}

export function useListSignatoriesAccount({ walletAddress, networkId }: Props) {
  const [data, setData] = useState<SignatoriesAccount[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signatoriesAccountRepository } = useLocalDbContext();

  useEffect(() => {
    if (!walletAddress || !networkId) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result =
          await signatoriesAccountRepository?.findSignatoriesByThreshold(
            walletAddress,
            networkId
          );
        setData(result);
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [walletAddress, networkId, signatoriesAccountRepository]);

  return { data, isLoading, error };
}
