import { ChangeEvent, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { AddressBook } from "@/domain/AddressBooks";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { ChainId } from "@/services/useink/types";
import { isValidAddress } from "@/utils/blockchain";

const VALIDATIONS = {
  isValidAddress: isValidAddress,
  existAddress: (accountAddress: string, data: AddressBook[]): boolean =>
    data.some((element) => element.address === accountAddress),
};

const ERROR_MESSAGES = {
  ALREADY_EXITS: "This address is already registered",
  INVALID_ADDRESS: "This is not a valid address",
};

const initialErrorState = {
  isError: false,
  helperText: "",
};

export function useAddAddressBook() {
  const { addressBookRepository } = useLocalDbContext();
  const { network } = usePolkadotContext();
  const [formInput, setFormInput] = useState<AddressBook>({
    address: "",
    name: "",
    isEditable: false,
    networkId: network ?? "astar",
  });
  const [error, setError] = useState(initialErrorState);

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
    const exist = VALIDATIONS.existAddress(
      formInput?.address,
      addressBookRepository.getAddressList(network as ChainId)
    );

    if (exist) {
      setError({
        isError: true,
        helperText: ERROR_MESSAGES.ALREADY_EXITS,
      });
      return;
    }
    const isValid = VALIDATIONS.isValidAddress(formInput.address);
    if (!isValid) {
      setError({
        isError: true,
        helperText: ERROR_MESSAGES.INVALID_ADDRESS,
      });
      return;
    }

    addAddress(formInput, network);
    setError(initialErrorState);
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
      new CustomEvent(AddressBookEvents.onFetchAddressBook)
    );
  };

  const resetErrorState = () => {
    setError(initialErrorState);
  };

  return {
    addAddress,
    handleChangeInput,
    handleClick,
    resetErrorState,
    error,
  };
}
