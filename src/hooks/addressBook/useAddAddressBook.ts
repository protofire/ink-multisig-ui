import { ChangeEvent, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { AddressBook } from "@/domain/AddressBooks";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { ChainId } from "@/services/useink/types";
import { isValidAddress } from "@/utils/blockchain";

const VALIDATIONS = {
  isInputEmpty: (input: string) => input.trim() === "",
  isValidAddress: isValidAddress,
  existAddress: (accountAddress: string, data: AddressBook[]): boolean =>
    data.some((element) => element.address === accountAddress),
};

const ERROR_MESSAGES = {
  EMPTY_INPUT: "This input should not be empty",
  ALREADY_EXITS: "This address is already registered",
  INVALID_ADDRESS: "This is not a valid address",
};

const initialErrorState = {
  name: {
    isError: false,
    helperText: "",
  },
  address: {
    isError: false,
    helperText: "",
  },
};

const initialFormState = (network: ChainId) => ({
  address: "",
  name: "",
  networkId: network ?? "astar",
});

export const useAddAddressBook = () => {
  const { addressBookRepository } = useLocalDbContext();
  const { network } = usePolkadotContext();
  const [formInput, setFormInput] = useState<AddressBook>(
    initialFormState(network as ChainId)
  );
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
    setError(initialErrorState);
    const isNameEmpty = VALIDATIONS.isInputEmpty(formInput.name);

    if (isNameEmpty) {
      setError((prev) => ({
        ...prev,
        name: {
          isError: true,
          helperText: ERROR_MESSAGES.EMPTY_INPUT,
        },
      }));
    }

    const exist = VALIDATIONS.existAddress(
      formInput?.address,
      addressBookRepository.getAddressList(network as ChainId)
    );

    if (exist) {
      setError((prev) => ({
        ...prev,
        address: {
          isError: true,
          helperText: ERROR_MESSAGES.ALREADY_EXITS,
        },
      }));
      return;
    }

    const isValid = VALIDATIONS.isValidAddress(formInput.address);
    if (!isValid) {
      setError((prev) => ({
        ...prev,
        address: {
          isError: true,
          helperText: !isValid
            ? ERROR_MESSAGES.INVALID_ADDRESS
            : ERROR_MESSAGES.EMPTY_INPUT,
        },
      }));
      return;
    }

    if (isNameEmpty) {
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
    };

    addressBookRepository.addAddress(newRegister);
    document.dispatchEvent(
      new CustomEvent(AddressBookEvents.onFetchAddressBook)
    );
  };

  const resetState = (network: ChainId) => {
    setFormInput(initialFormState(network));
    setError(initialErrorState);
  };

  return {
    addAddress,
    handleChangeInput,
    handleClick,
    resetState,
    error,
  };
};
