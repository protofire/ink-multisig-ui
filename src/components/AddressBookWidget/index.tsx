import * as React from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useListAddressBook } from "@/hooks/addressBook/useListAddressBook";

import { AddressBookItem } from "./AddressBookItem";
import {
  AddressBookWidgetStyled,
  NoItems,
  StyledButton,
  StyledList,
} from "./styled";

export const AddressBookWidget = () => {
  const { network } = usePolkadotContext();
  const { data } = useListAddressBook(network as string);

  return (
    <AddressBookWidgetStyled border={false}>
      {data?.length == 0 ? (
        <StyledList>
          <NoItems>There are no registered address in this network</NoItems>
        </StyledList>
      ) : (
        <>
          <AddressBookItem data={data} />
          <StyledButton> View All </StyledButton>
        </>
      )}
    </AddressBookWidgetStyled>
  );
};
