import { useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { customReportError } from "@/utils/error";

export function useSetXsignerSelected() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { xsignerSelectedRepository } = useLocalDbContext();

  async function setXsigner(
    account: SignatoriesAccount
  ): Promise<SignatoriesAccount | void> {
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
  }

  return { setXsigner, isLoading, error };
}
