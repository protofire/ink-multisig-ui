import { Box, ButtonBase, Typography } from "@mui/material";
import React from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useFetchAddressBook } from "@/hooks/addressBook/useFetchAddressBook";

import { ModalAddressBook } from "../ModalAddressBook";
import AddressBookTable from "./AddressBookTable";
import { AddressBookWidgetStyled, NoItems, StyledList } from "./styled";

export const AddressBookPage = () => {
  const { network } = usePolkadotContext();
  const { data } = useFetchAddressBook(network);
  const [displayModalWallet, setDisplayModalWallet] = React.useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Typography variant="h3" color="#FFE873">
          Address book
        </Typography>
        <ButtonBase
          sx={{
            color: "#FFE873",
            fontSize: "1rem",
            fontWeight: "800",
          }}
          onClick={() => setDisplayModalWallet(true)}
        >
          + Create entry
        </ButtonBase>
      </Box>
      <AddressBookWidgetStyled border={false}>
        {data?.length == 0 ? (
          <StyledList>
            <NoItems>There are no registered address in this network</NoItems>
          </StyledList>
        ) : (
          <AddressBookTable />
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
