import { useCallback, useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { AddressBookItemUi } from "@/domain/AddressBooks";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { formatAddressForNetwork } from "@/utils/blockchain";
import { customReportError } from "@/utils/error";

export interface UseListAddressBookReturn {
  data: AddressBookItemUi[];
  isLoading: boolean;
  error: string | null;
}

export function useListAddressBook(
  networkId: string | undefined
): UseListAddressBookReturn {
  const [data, setData] = useState<AddressBookItemUi[]>([]);
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
        address: element.address,
        formattedAddress: formatAddressForNetwork(element.address, network),
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
