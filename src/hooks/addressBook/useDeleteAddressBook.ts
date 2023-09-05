import { useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { customReportError } from "@/utils/error";

export function useDeleteAddressBook() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addressBookRepository } = useLocalDbContext();

  const deleteAddressBook = (accountAddress: string) => {
    setIsLoading(true);
    setError(null);
    try {
      addressBookRepository.deleteAddress(accountAddress);
      document.dispatchEvent(
        new CustomEvent(AddressBookEvents.onAddressBookCreation)
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
