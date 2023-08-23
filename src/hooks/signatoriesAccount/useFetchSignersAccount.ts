import { useEffect, useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { customReportError } from "@/utils/error";

interface Props {
  address: string;
}

export function useFetchSignersAccount({ address }: Props) {
  const [data, setData] = useState<SignatoriesAccount | undefined>(undefined);
  const { accountConnected } = usePolkadotContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // mock fake promise - This will be replaced once we have the API
        const result = await new Promise<SignatoriesAccount>((resolve) => {
          setTimeout(() => {
            resolve({
              address,
              name: "My-imported-wallet",
              threshold: 1,
              owners: [
                {
                  address: accountConnected?.address ?? "",
                  name: "Signer 1",
                },
              ],
            } as SignatoriesAccount);
          }, 1000);
        });
        setData(result);
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accountConnected?.address, address]);

  return { data, isLoading, error };
}
