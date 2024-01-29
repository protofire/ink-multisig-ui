import { useCallback, useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { XsignerAccountEvents } from "@/domain/events/XsignerAccountEvents";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { createArrayOneOrMore } from "@/domain/utilityTsTypes";
import { getHexAddress } from "@/utils/blockchain";

import { useEventListenerCallback } from "../useEventListenerCallback";

interface UseGetXsignerSelectedReturn {
  xSignerSelected: SignatoriesAccount | null | undefined;
}

export function useGetXsignerSelected(): UseGetXsignerSelectedReturn {
  const {
    xsignerSelectedRepository,
    signatoriesAccountRepository,
    addressBookRepository,
  } = useLocalDbContext();
  const { network } = usePolkadotContext();
  const [xSignerSelected, setXsignerSelected] = useState<
    SignatoriesAccount | null | undefined
  >();

  const getAccount = useCallback(async () => {
    const addressAccount = xsignerSelectedRepository.getAccount();

    const account =
      addressAccount &&
      (await signatoriesAccountRepository.getSignatoryAccount(
        network,
        addressAccount
      ));

    if (account) {
      setXsignerSelected({
        ...account,
        owners: createArrayOneOrMore(
          account.owners.map((owner) => {
            const inAddressBook = addressBookRepository.getItemByAddress(
              getHexAddress(owner.address)
            );

            if (!inAddressBook) return { ...owner, inAddressBook: false };

            return { ...owner, name: inAddressBook.name, inAddressBook: true };
          })
        ),
      });
    } else {
      setXsignerSelected(null);
    }
  }, [
    addressBookRepository,
    network,
    signatoriesAccountRepository,
    xsignerSelectedRepository,
  ]);

  useEffect(() => {
    getAccount();
  }, [getAccount, signatoriesAccountRepository]);

  useEventListenerCallback(
    [
      XsignerAccountEvents.onChangeAccount,
      XsignerAccountEvents.blockchainAccountsReloaded,
    ],
    () => getAccount()
  );

  return { xSignerSelected };
}
