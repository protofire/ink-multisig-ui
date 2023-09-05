import * as React from "react";

import { ChainExtended, getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useFetchAddressBook } from "@/hooks/addressBook/useFetchAddressBook";

import { AddressBookItem } from "./AddressBookItem";
import {
  AddressBookWidgetStyled,
  NoItems,
  StyledButton,
  StyledList,
} from "./styled";

export const AddressBookWidget = () => {
  const { network } = usePolkadotContext();
  const { data } = useFetchAddressBook(network as string);

  return (
    <AddressBookWidgetStyled border={false}>
      {data?.length === 0 ? (
        <StyledList>
          <NoItems>There are no registered address in this network</NoItems>
        </StyledList>
      ) : (
        <>
          <StyledList>
            {data?.map((addressBook, index) => {
              const network = getChain(addressBook.networkId);
              return (
                <AddressBookItem
                  addressBook={addressBook}
                  network={network as ChainExtended}
                  key={index}
                />
              );
            })}
          </StyledList>
          <StyledButton> View All </StyledButton>
        </>
      )}
    </AddressBookWidgetStyled>
  );
};
