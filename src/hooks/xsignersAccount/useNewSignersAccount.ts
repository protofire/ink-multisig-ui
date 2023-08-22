import { useCallback, useState } from "react";

import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { generateHash } from "@/utils/blockchain";
import { customReportError } from "@/utils/error";

import { useSdkXsigners } from "../useSdkXsigners";

interface SaveOptions {
  onSuccess?: (account: SignatoriesAccount) => void;
  onFallback?: (error: string) => void;
}

export function useNewSignersAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { multisigFactory } = useSdkXsigners();

  const save = useCallback(
    async (
      account: SignatoriesAccount,
      options?: SaveOptions
    ): Promise<SignatoriesAccount | void> => {
      setIsLoading(true);
      if (!multisigFactory) return;
      const salt = generateHash(Date.now.toString());
      const owners = account.owners.map((o) => o.address);

      try {
        await multisigFactory.tx.newMultisig(account.threshold, owners, salt);

        // newMultisig.signAndSend(
        //   [account.threshold],
        //   undefined,
        //   (result, api, error) => {
        //     console.log("result", result, "api", api, "error", error);
        //   }
        // );

        return account;
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
        options?.onFallback?.(errorFormated);
      } finally {
        setIsLoading(false);
      }
    },
    [multisigFactory]
  );

  return { save, isLoading, error };
}
