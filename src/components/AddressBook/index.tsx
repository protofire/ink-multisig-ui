import { Box, ButtonBase, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import type { AddressBook } from "@/domain/AddressBooks";
import { useListAddressBook } from "@/hooks/addressBook/useListAddressBook";
import { setLocalStorageState } from "@/utils/localStorage";

import { ModalAddressBook } from "../ModalAddressBook";
import AddressBookTable from "./AddressBookTable";
import { AddressBookWidgetStyled, NoItems, StyledList } from "./styled";

export type AddressBookInput = AddressBook & {
  isEditable: boolean;
};

const ITEM_LOCAL_STORAGE = "addressBook";

export const AddressBookPage = () => {
  const { network } = usePolkadotContext();
  const { data } = useListAddressBook(network as string);

  const [addressBookData, setAddressBookData] = useState<
    AddressBookInput[] | undefined
  >([]);

  const [displayModalWallet, setDisplayModalWallet] = React.useState(false);
  const [formInput, setFormInput] = useState<AddressBookInput>();

  React.useEffect(() => {
    const newData: AddressBookInput[] | undefined = data?.map((element) => ({
      ...element,
      isEditable: false,
    }));
    setAddressBookData(newData);
  }, [data]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const newRegister = {
      ...data,
      networkId: network,
      name: formInput?.name,
      address: formInput?.address,
    } as AddressBookInput;
    const newData = addressBookData?.concat(newRegister) as AddressBookInput[];
    setAddressBookData(newData);
    setLocalStorageState(ITEM_LOCAL_STORAGE, newData);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormInput(
      (prev) =>
        ({
          ...prev,
          [e.target.name]: e.target.value,
        } as AddressBookInput)
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3" color="#FFE873">
          Address book
        </Typography>
        <ButtonBase
          sx={{
            color: "#FFE873",
          }}
          onClick={() => setDisplayModalWallet(true)}
        >
          + CreateEntry
        </ButtonBase>
      </Box>
      <AddressBookWidgetStyled border={false}>
        {addressBookData?.length == 0 ? (
          <StyledList>
            <NoItems>There are no registered address in this network</NoItems>
          </StyledList>
        ) : (
          <AddressBookTable
            data={addressBookData}
            setAddressBookData={setAddressBookData}
          />
        )}
      </AddressBookWidgetStyled>
      <ModalAddressBook
        open={displayModalWallet}
        onClose={() => setDisplayModalWallet(false)}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        network={network}
      />
    </>
  );
};
