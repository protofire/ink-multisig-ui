import { useCallback, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { XsignerAccountEvents } from "@/domain/events/XsignerAccountEvents";
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
  const { xsignerSelectedRepository, signatoriesAccountRepository } =
    useLocalDbContext();

  const setXsigner = useCallback(
    async (account: SignatoriesAccount): Promise<SignatoriesAccount | void> => {
      setIsLoading(true);

      try {
        xsignerSelectedRepository.saveAccount(account.address);
        signatoriesAccountRepository.updateSignatoryAccount(account, {
          owners: account.owners,
          threshold: account.threshold,
        });
        document.dispatchEvent(
          new CustomEvent(XsignerAccountEvents.onChangeAccount)
        );
        return account;
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    },
    [signatoriesAccountRepository, xsignerSelectedRepository]
  );

  return { setXsigner, isLoading, error };
}
