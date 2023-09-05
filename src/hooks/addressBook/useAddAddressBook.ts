import { ChangeEvent, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { AddressBook } from "@/domain/AddressBooks";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { ChainId } from "@/services/useink/types";

export function useAddAddressBook() {
  const { addressBookRepository } = useLocalDbContext();
  const [formInput, setFormInput] = useState<AddressBook>();
  const [error, setError] = useState({
    isError: false,
    helperText: "",
  });
  const { network } = usePolkadotContext();

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setFormInput(
      (prev) =>
        ({
          ...prev,
          [e.target.name]: e.target.value,
        } as AddressBook)
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!formInput) return;
    const valid = isValidAddress(formInput?.address);
    if (valid) {
      setError({
        isError: true,
        helperText: "This address is already registered",
      });
      return;
    }
    addAddress(formInput, network);
  };

  const isValidAddress = (accountAddress: string): boolean => {
    const data = addressBookRepository.getAddressList(network as ChainId);
    const filter = data.some((element) => element.address === accountAddress);
    return filter;
  };

  const addAddress = (
    addressBook: AddressBook | undefined,
    network: ChainId | undefined
  ) => {
    if (!addressBook) return;
    const newRegister: AddressBook = {
      networkId: network as ChainId,
      name: addressBook?.name,
      address: addressBook?.address,
      isEditable: false,
    };

    addressBookRepository.addAddress(newRegister);
    document.dispatchEvent(
      new CustomEvent(AddressBookEvents.onAddressBookCreation)
    );
  };

  return {
    addAddress,
    handleChangeInput,
    handleClick,
    error,
  };
}
