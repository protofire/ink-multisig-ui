import { useCallback, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { customReportError } from "@/utils/error";

interface UseSetXsignerSelectedReturn {
  setXsigner: (
    account: SignatoriesAccount
  ) => Promise<SignatoriesAccount | void>;
  isLoading: boolean;
  error: string | null;
}

export function useSetXsignerSelected(): UseSetXsignerSelectedReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { xsignerSelectedRepository } = useLocalDbContext();

  const setXsigner = useCallback(
    async (account: SignatoriesAccount): Promise<SignatoriesAccount | void> => {
      setIsLoading(true);

      try {
        xsignerSelectedRepository.saveAccount(account);
        return account;
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    },
    [xsignerSelectedRepository]
  );

  return { setXsigner, isLoading, error };
}
