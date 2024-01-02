import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { MultisigContractEvents } from "@/domain/events/MultisigContractEvents";
import { XsignerAccountEvents } from "@/domain/events/XsignerAccountEvents";
import { Owner, SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { ArrayOneOrMore } from "@/domain/utilityTsTypes";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { customReportError } from "@/utils/error";

import { usePolkadotContext } from "./usePolkadotContext";

interface CallerXsignersAccountContextProps {
  multisigs: SignatoriesAccount[] | null;
  isLoading: boolean;
  error: string | null;
}

const CallerXsignersAccountContext = createContext<
  CallerXsignersAccountContextProps | undefined
>(undefined);

export const CallerXsignersAccountProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [multisigs, setMultisigs] = useState<SignatoriesAccount[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { network: networkId, accountConnected } = usePolkadotContext();
  const { xsignerOwnersRepository, signatoriesAccountRepository } =
    useLocalDbContext();

  const fetchAndUpdateMultisigs = useCallback(async () => {
    const accountAddress = accountConnected?.address;
    if (!accountAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      const multisigsFromRepo =
        await xsignerOwnersRepository.getMultisigsByOwner(accountAddress);
      const localMultisigs =
        await signatoriesAccountRepository?.findSignatoriesByOwner(
          accountAddress,
          networkId
        );

      const accountsToUpdate = [];

      for (const multisig of multisigsFromRepo || []) {
        const existingAccount = localMultisigs.find(
          (acc) => acc.address === multisig.address
        );

        if (existingAccount) {
          const updatedOwners = multisig.owners.map((owner: Owner) => {
            const oldOwnerData =
              existingAccount.owners.find((o) => o.address === owner.address) ||
              owner;
            return { ...owner, name: oldOwnerData.name };
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

        document.dispatchEvent(
          new CustomEvent(XsignerAccountEvents.blockchainAccountsReloaded)
        );
      }

      const updatedMultisigs =
        await signatoriesAccountRepository?.findSignatoriesByOwner(
          accountAddress,
          networkId
        );

      setMultisigs(updatedMultisigs);
    } catch (err) {
      const errorFormatted = customReportError(err);
      setError(errorFormatted);
    } finally {
      setIsLoading(false);
    }
  }, [
    accountConnected,
    xsignerOwnersRepository,
    signatoriesAccountRepository,
    networkId,
  ]);

  useEffect(() => {
    fetchAndUpdateMultisigs();
  }, [fetchAndUpdateMultisigs]);

  useEventListenerCallback(
    [
      MultisigContractEvents.OwnerAdded,
      MultisigContractEvents.OwnerRemoved,
      MultisigContractEvents.ThresholdChanged,
    ],
    () => fetchAndUpdateMultisigs()
  );

  return (
    <CallerXsignersAccountContext.Provider
      value={{ multisigs, isLoading, error }}
    >
      {children}
    </CallerXsignersAccountContext.Provider>
  );
};

export function useCallerXsignersAccount() {
  const context = useContext(CallerXsignersAccountContext);

  if (context === undefined) {
    throw new Error(
      "useCallerXsignersAccount must be used inside CallerXsignersAccountProvider"
    );
  }

  return context;
}
