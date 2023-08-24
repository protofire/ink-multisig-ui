import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { AddressBook } from "@/domain/AddressBooks";
import { customReportError } from "@/utils/error";

export function useListAddressBook(networkId: string) {
  const [data, setData] = useState<AddressBook[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addressBookRepository } = useLocalDbContext();

  useEffect(() => {
    if (!networkId || !addressBookRepository) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = addressBookRepository.getAddressList(networkId);
        setData(result);
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [networkId, addressBookRepository]);

  return { data, isLoading, error };
}
