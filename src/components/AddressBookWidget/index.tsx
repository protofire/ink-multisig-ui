import { Button } from "@mui/material";
import Link from "next/link";
import * as React from "react";

import { ChainExtended, getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
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
          <NoItems>
            There are no registered address in this network yet.{" "}
            <Link href={ROUTES.AddressBook} passHref>
              <Button variant="outlined">Add new address</Button>
            </Link>
          </NoItems>
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
