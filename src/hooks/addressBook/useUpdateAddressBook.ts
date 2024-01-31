import { useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { AddressBook } from "@/domain/AddressBooks";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { getHexAddress } from "@/utils/blockchain";

export type AddressBookInput = Partial<Pick<AddressBook, "address" | "name">>;

type UpdateAddressBookProps = {
  oldAddressBook: AddressBook;
  newAddressBook: AddressBook;
};

export interface UseUpdateAddressBook {
  updateAddressBook: ({
    oldAddressBook,
    newAddressBook,
  }: UpdateAddressBookProps) => void;
}

export function useUpdateAddressBook(): UseUpdateAddressBook {
  const { addressBookRepository } = useLocalDbContext();
  const [editInput, setEditInput] = useState<AddressBookInput>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setEditInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateAddressBook = ({
    oldAddressBook,
    newAddressBook,
  }: UpdateAddressBookProps) => {
    const hexAddress = getHexAddress(newAddressBook.address);

    const addressesInAddressBook = addressBookRepository.getAddressList(
      oldAddressBook.networkId
    );
    const index = addressesInAddressBook?.findIndex(
      (row) => row.address === oldAddressBook.address
    );

    addressesInAddressBook[index] = { ...newAddressBook, address: hexAddress };
    addressBookRepository.saveAddress(addressesInAddressBook);
    document.dispatchEvent(
      new CustomEvent(AddressBookEvents.addressBookUpdated)
    );
  };

  return {
    updateAddressBook,
  };
}
