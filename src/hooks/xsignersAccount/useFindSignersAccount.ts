import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { ChainId } from "@/services/useink/types";
import { customReportError } from "@/utils/error";

interface Props {
  ownerAddress: string | undefined;
  networkId: ChainId | undefined;
}

export function useFindSignersAccount({ ownerAddress, networkId }: Props) {
  const [data, setData] = useState<SignatoriesAccount[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signatoriesAccountRepository } = useLocalDbContext();

  useEffect(() => {
    if (!ownerAddress || !networkId || !signatoriesAccountRepository) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result =
          await signatoriesAccountRepository?.findSignatoriesByOwner(
            ownerAddress,
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
  }, [ownerAddress, networkId, signatoriesAccountRepository]);

  return { data, isLoading, error };
}
