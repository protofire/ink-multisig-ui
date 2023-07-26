import { useEffect, useState } from "react";

import { customReportError } from "@/utils/error";

interface SignatoriesAccount {
  address: string;
  threshold: number;
}

export function useSignatoriesAccount() {
  const [data, setData] = useState<SignatoriesAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // const success = Math.random() > 0.2; // Simulate error with 80% success rate
  const success = true; // For testing pusposes while cnx is implemented

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // TODO Create real request
        const result = await new Promise<SignatoriesAccount[]>(
          (resolve, reject) =>
            setTimeout(
              () => {
                if (success) {
                  resolve([
                    {
                      address:
                        "5ExnZyApmUUm3vAJPTbSHttWNYbYSdBswLiWzBtaivi6tRxA",
                      threshold: 1,
                    },
                    {
                      address:
                        "5D3HHxVrJ5P9Zosmf7dQmzM5soBF3Vw2LGCdczL9ivc5dLYy",
                      threshold: 2,
                    },
                  ]);
                } else {
                  reject("Error simulado");
                }
              },
              2000 // 2 seconds of delay
            )
        );
        setData(result);
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
        setIsFirstLoad(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error, isFirstLoad };
}
