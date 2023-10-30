import { useCallback, useState } from "react";
import { ChainId } from "useink/dist/chains";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { customReportError } from "@/utils/error";

interface DeleteOptions {
  onSuccess?: () => void;
  onFallback?: (error: string) => void;
}

interface DeleteXsignerProps {
  address: string;
  options?: DeleteOptions;
}

export interface UseDeleteSignersAccount {
  delete: (props: DeleteXsignerProps) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useDeleteSignersAccount(): UseDeleteSignersAccount {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { network } = usePolkadotContext();
  const { signatoriesAccountRepository } = useLocalDbContext();

  const deleteAccount = useCallback(
    async (props: DeleteXsignerProps): Promise<void> => {
      setIsLoading(true);
      const { address, options } = props;

      try {
        await signatoriesAccountRepository?.deleteSignatoryAccount(
          address,
          network as ChainId
        );
        options?.onSuccess?.();
      } catch (err) {
        const errorFormatted = customReportError(err);
        setError(errorFormatted);
        options?.onFallback?.(errorFormatted);
      } finally {
        setIsLoading(false);
      }
    },
    [network, signatoriesAccountRepository]
  );

  return { delete: deleteAccount, isLoading, error };
}
