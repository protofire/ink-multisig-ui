import { Button } from "@mui/material";
import Link from "next/link";
import * as React from "react";

import { ChainExtended, getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useListAddressBook } from "@/hooks/addressBook/useListAddressBook";

import { ModalAddressBook } from "../ModalAddressBook";
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
  const [displayModalWallet, setDisplayModalWallet] = React.useState(false);

  return (
    <>
      <AddressBookWidgetStyled border={false}>
        {data?.length === 0 ? (
          <StyledList>
            <NoItems>
              There are no registered address in this network yet.{" "}
              <Button
                variant="outlined"
                onClick={() => setDisplayModalWallet(true)}
              >
                Add new address
              </Button>
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
            <Link href={ROUTES.AddressBook} passHref>
              <StyledButton> View All </StyledButton>
            </Link>
          </>
        )}
      </AddressBookWidgetStyled>
      <ModalAddressBook
        open={displayModalWallet}
        network={network}
        handleClose={() => setDisplayModalWallet(false)}
      />
    </>
  );
};
