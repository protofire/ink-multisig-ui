import { useState } from "react";
import { MultisigFactory } from "xsigners-sdk/src";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { customReportError } from "@/utils/error";

import { useNetworkApi } from "../useNetworkApi";

interface SaveOptions {
  onSuccess?: (account: SignatoriesAccount) => void;
  onFallback?: (error: string) => void;
}

export function useNewSignersAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signatoriesAccountRepository } = useLocalDbContext();
  const apiProvider = useNetworkApi();
  const contractBuilder = apiProvider && new MultisigFactory(apiProvider.api);

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
