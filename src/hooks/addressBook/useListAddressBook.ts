import { useCallback, useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { AddressBook } from "@/domain/AddressBooks";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { customReportError } from "@/utils/error";

export function useListAddressBook(networkId: string | undefined) {
  const [data, setData] = useState<AddressBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addressBookRepository } = useLocalDbContext();

  const fetchData = useCallback(
    async (networkId: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = addressBookRepository.getAddressList(networkId);
        if (!result) return [];
        const newData = result.map((element) => ({
          ...element,
          isEditable: false,
        }));
        setData(newData);
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    },
    [addressBookRepository]
  );

  useEffect(() => {
    if (!networkId || !addressBookRepository) return;
    fetchData(networkId);

    document.addEventListener(AddressBookEvents.addressBookUpdated, () => {
      fetchData(networkId);
    });
    return () => {
      document.removeEventListener(AddressBookEvents.addressBookUpdated, () => {
        fetchData(networkId);
      });
    };
  }, [addressBookRepository, fetchData, networkId]);

  return {
    data,
    isLoading,
    error,
  };
}
