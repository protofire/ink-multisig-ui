import { useCallback, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { getHexAddress } from "@/utils/blockchain";

export interface UseSetInAddressBook {
  findInAddressBook: (address: string) => null | string;
}

/* Checking and caching if a given address is in the address book.
 *
 * This hook uses a local state to cache addresses found in the address book for quick lookup.
 * It exposes a function `findInAddressBook` that takes an address as input, converts it to a hex format,
 * and checks if this hex-formatted address is already cached in the state.
 * If not, it queries the address book repository to check if the address exists there.
 * If the address is found in the address book, its name is returned and also cached for future queries.
 *
 * @returns {UseSetInAddressBook} An object containing the `findInAddressBook` function.
 */
export function useSetInAddressBook(): UseSetInAddressBook {
  const [addressesFound, setAddressesFound] = useState<Record<string, string>>(
    {}
  );
  const { addressBookRepository } = useLocalDbContext();

  const findInAddressBook = useCallback(
    (address: string) => {
      const hexAddress = getHexAddress(address);
      if (hexAddress in addressesFound) return addressesFound[hexAddress];

      const inAddressBook = addressBookRepository.getItemByAddress(hexAddress);

      if (inAddressBook) {
        setAddressesFound((prev) => ({
          ...prev,
          hexAddress: inAddressBook.name,
        }));

        return inAddressBook.name;
      }

      return null;
    },
    [addressBookRepository, addressesFound]
  );

  return {
    findInAddressBook,
  };
}
