import { useCallback, useEffect, useState } from "react";
import { ChainId } from "useink/dist/chains";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { Owner, SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { ArrayOneOrMore } from "@/domain/utilityTsTypes";

interface UseMultisigsByOwnerReturn {
  multisigs: SignatoriesAccount[] | null;
  isLoading: boolean;
  error: Error | null;
}

interface Props {
  accountAddress: string | undefined;
  networkId: ChainId;
}

export function useFetchXsignersAccountByOwner({
  accountAddress,
  networkId,
}: Props): UseMultisigsByOwnerReturn {
  const [multisigs, setMultisigs] = useState<SignatoriesAccount[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { xsignerOwnersRepository, signatoriesAccountRepository } =
    useLocalDbContext();

  const fetchAndUpdateMultisigs = useCallback(
    async (address: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const multisigsFromRepo =
          await xsignerOwnersRepository.getMultisigsByOwner(address);
        const localMultisigs =
          await signatoriesAccountRepository?.findSignatoriesByOwner(
            address,
            networkId
          );

        const accountsToUpdate = [];

        for (const multisig of multisigsFromRepo || []) {
          const existingAccount = localMultisigs.find(
            (acc) => acc.address === multisig.address
          );

          if (existingAccount) {
            const updatedOwners = existingAccount.owners.map((owner: Owner) => {
              const newOwnerData =
                multisig.owners.find((o) => o.address === owner.address) ||
                owner;
              return { ...newOwnerData, name: owner.name };
            });

            accountsToUpdate.push({
              ...multisig,
              name: existingAccount.name,
              owners: updatedOwners as ArrayOneOrMore<Owner>,
            });
          } else {
            accountsToUpdate.push(multisig);
          }
        }

        if (accountsToUpdate.length > 0) {
          await signatoriesAccountRepository.updateSignatoriesAccountsInBatch(
            accountsToUpdate
          );
        }

        const updatedMultisigs =
          await signatoriesAccountRepository?.findSignatoriesByOwner(
            address,
            networkId
          );

        setMultisigs(updatedMultisigs);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    },
    [xsignerOwnersRepository, signatoriesAccountRepository, networkId]
  );

  useEffect(() => {
    if (!accountAddress || !networkId) return;

    fetchAndUpdateMultisigs(accountAddress);
  }, [accountAddress, fetchAndUpdateMultisigs, networkId]);

  return { multisigs, isLoading, error };
}
