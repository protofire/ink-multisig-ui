import { ContractPromise } from "@polkadot/api-contract";
import { useCallback, useEffect, useState } from "react";
import { useCall } from "useink";

import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { customReportError } from "@/utils/error";

import { useSdkXsigners } from "../useSdkXsigners";

interface SaveOptions {
  onSuccess?: (account: SignatoriesAccount) => void;
  onFallback?: (error: string) => void;
}

export function useNewSignersAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { multisigFactory, network } = useSdkXsigners();
  const [contractPromise, setContractPromise] = useState<ContractPromise>();
  const newMultisig = useCall(
    contractPromise &&
      network && {
        contract: contractPromise,
        chainId: network,
      },
    "newMultisig"
  );

  useEffect(() => {
    if (!multisigFactory) return;

    setContractPromise(multisigFactory.buildContractPromise());
  }, [multisigFactory]);

  const save = useCallback(
    async (
      account: SignatoriesAccount,
      options?: SaveOptions
    ): Promise<SignatoriesAccount | void> => {
      setIsLoading(true);

      try {
        newMultisig
          .send([
            account.threshold,
            account.owners.map((o) => o.address).join(","),
          ])
          .then(console.log);

        return account;
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
        options?.onFallback?.(errorFormated);
      } finally {
        setIsLoading(false);
      }
    },
    [newMultisig]
  );

  return { save, isLoading, error };
}
