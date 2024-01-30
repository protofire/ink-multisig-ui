import { useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { AddressBook } from "@/domain/AddressBooks";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { customReportError } from "@/utils/error";

export interface UseDeleteAddressBookReturn {
  deleteAddressBook: (accountAddress: AddressBook["address"]) => void;
  isLoading: boolean;
  error: string | null;
}

export function useDeleteAddressBook(): UseDeleteAddressBookReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addressBookRepository } = useLocalDbContext();

  const deleteAddressBook = (accountAddress: AddressBook["address"]) => {
    setIsLoading(true);
    setError(null);
    try {
      addressBookRepository.deleteAddress(accountAddress);
      document.dispatchEvent(
        new CustomEvent(AddressBookEvents.addressBookUpdated)
      );
    } catch (err) {
      const errorFormated = customReportError(err);
      setError(errorFormated);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteAddressBook,
    isLoading,
    error,
  };
}
