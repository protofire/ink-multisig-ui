import { useCallback, useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { AddressBook } from "@/domain/AddressBooks";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { customReportError } from "@/utils/error";

export function useListAddressBook(networkId: string | undefined) {
  const [data, setData] = useState<AddressBook[]>([]);
  const { network } = usePolkadotContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addressBookRepository } = useLocalDbContext();

  const fetchData = useCallback(async () => {
    if (!network || !addressBookRepository) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = addressBookRepository.getAddressList(network);
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
  }, [addressBookRepository, network]);

  useEventListenerCallback(AddressBookEvents.addressBookUpdated, () =>
    fetchData()
  );

  useEffect(() => {
    fetchData();
  }, [addressBookRepository, fetchData, networkId]);

  return {
    data,
    isLoading,
    error,
  };
}
