import { useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { customReportError } from "@/utils/error";

interface SaveOptions {
  onSuccess?: (account: SignatoriesAccount) => void;
  onFallback?: (error: string) => void;
}

interface SaveXsignerProps {
  account: SignatoriesAccount;
  options?: SaveOptions;
}

export interface UseAddSignersAccount {
  save: (props: SaveXsignerProps) => Promise<SignatoriesAccount | void>;
  isLoading: boolean;
  error: string | null;
}

export function useAddSignersAccount(): UseAddSignersAccount {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signatoriesAccountRepository } = useLocalDbContext();

  async function save(
    props: SaveXsignerProps
  ): Promise<SignatoriesAccount | void> {
    setIsLoading(true);
    const { account, options } = props;

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
