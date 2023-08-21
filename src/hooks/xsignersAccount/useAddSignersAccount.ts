import { useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { customReportError } from "@/utils/error";

interface SaveOptions {
  onSuccess?: (account: SignatoriesAccount) => void;
  onFallback?: (error: string) => void;
}

export function useAddSignersAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signatoriesAccountRepository } = useLocalDbContext();

  async function save(
    account: SignatoriesAccount,
    options?: SaveOptions
  ): Promise<SignatoriesAccount | void> {
    setIsLoading(true);

    try {
      await signatoriesAccountRepository
        ?.addSignatoryAccount(account)
        .finally(() => options?.onSuccess?.(account));

      return account;
    } catch (err) {
      const errorFormated = customReportError(err);
      setError(errorFormated);
      options?.onFallback?.(errorFormated);
    } finally {
      setIsLoading(false);
    }
  }

  return { save, isLoading, error };
}
