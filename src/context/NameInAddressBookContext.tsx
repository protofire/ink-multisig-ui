import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { getHexAddress } from "@/utils/blockchain";

import { usePolkadotContext } from "./usePolkadotContext";

export interface NameInAddressBookContextType {
  findInAddressBook: (address: string) => null | string;
  nameConnectedOrAddressBookOrSigners: (address: string) => null | string;
  isLoading: boolean;
}

const INITIAL_STATE: Record<string, string> = {};
export const YOU_TEXT = "You 🫵 ";

const NameInAddressBookContext = createContext<
  NameInAddressBookContextType | undefined
>(undefined);

/* Checking and caching if a given address is in the address book.
 *
 * This hook uses a local state to cache addresses found in the address book for quick lookup.
 * It exposes a function `findInAddressBook` that takes an address as input, converts it to a hex format,
 * and checks if this hex-formatted address is already cached in the state.
 * If not, it queries the address book repository to check if the address exists there.
 * If the address is found in the address book, its name is returned and also cached for future queries.
 */

export const NameInAddressBookProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [addressesFound, setAddressesFound] =
    useState<Record<string, string>>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const { addressBookRepository } = useLocalDbContext();
  const { accountConnected } = usePolkadotContext();
  const { xSignerSelected } = useGetXsignerSelected();

  useEffect(() => {
    const loadNames = () => {
      setIsLoading(true);
      try {
        const _addresses = INITIAL_STATE;
        addressBookRepository
          .getAddressList()
          .map((address) => (_addresses[address.address] = address.name));

        setAddressesFound(_addresses);
      } finally {
        setIsLoading(false);
      }

      return null;
    };

    loadNames();

    document.addEventListener(AddressBookEvents.addressBookUpdated, () => {
      loadNames();
    });

    return () => {
      document.removeEventListener(AddressBookEvents.addressBookUpdated, () => {
        loadNames();
      });
    };
  }, [addressBookRepository]);

  const findInAddressBook = useCallback(
    (address: string) => {
      const hexAddress = getHexAddress(address);
      if (hexAddress in addressesFound) return addressesFound[hexAddress];

      return null;
    },
    [addressesFound]
  );

  const nameConnectedOrAddressBookOrSigners = useCallback(
    (address: string) => {
      if (accountConnected?.address === address) return YOU_TEXT;

      const inAddressBook = findInAddressBook(address);
      if (inAddressBook) return inAddressBook;

      const isSigner = xSignerSelected?.owners.find(
        (owner) => owner.address === address
      );
      if (isSigner) return isSigner.name;

      return null;
    },
    [accountConnected?.address, findInAddressBook, xSignerSelected?.owners]
  );

  return (
    <NameInAddressBookContext.Provider
      value={{
        findInAddressBook,
        isLoading,
        nameConnectedOrAddressBookOrSigners,
      }}
    >
      {children}
    </NameInAddressBookContext.Provider>
  );
};

export const useNameAddressBookContext = (): NameInAddressBookContextType => {
  const context = useContext(NameInAddressBookContext);
  if (context === undefined) {
    throw new Error(
      "useNameAddressBookContext must be used within a NameInAddressBookProvider"
    );
  }
  return context;
};
