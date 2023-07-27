import { useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";

export function useAddSignatoriesAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signatoriesAccountRepository } = useLocalDbContext();

  async function save(
    account: SignatoriesAccount
  ): Promise<SignatoriesAccount | void> {
    setIsLoading(true);

    await signatoriesAccountRepository
      ?.addSignatoryAccount(account)
      .finally(() => setIsLoading(false));
  }

  return { save, isLoading, error };
}
