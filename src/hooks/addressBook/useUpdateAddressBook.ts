import { useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { AddressBook } from "@/domain/AddressBooks";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";

export function useUpdateAddressBook() {
  const { addressBookRepository } = useLocalDbContext();
  const [editInput, setEditInput] = useState<AddressBook[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setEditInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateAddressBook = (addressBook: string) => {
    const item = addressBookRepository.getItemByAddress(addressBook);
    const element = {
      ...item,
      ...editInput,
      isEditable: false,
    } as AddressBook;

    const tempData = addressBookRepository.getAddressList(element.networkId);
    const index = tempData?.findIndex(
      (element) => element.address === addressBook
    );
    tempData[index] = element;
    addressBookRepository.saveAddress(tempData);
    document.dispatchEvent(
      new CustomEvent(AddressBookEvents.addressBookUpdated)
    );
  };

  return {
    handleChange,
    updateAddressBook,
  };
}
