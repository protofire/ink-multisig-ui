import { Box, ButtonBase, Typography } from "@mui/material";
import React from "react";

import { useListAddressBook } from "@/hooks/addressBook/useListAddressBook";
import { ChainId } from "@/services/useink/types";

import { ModalAddressBook } from "../ModalAddressBook";
import AddressBookTable from "./AddressBookTable";
import { AddressBookWidgetStyled, NoItems, StyledList } from "./styled";

type Props = {
  network: ChainId;
};

export const AddressBookContainer = ({ network }: Props) => {
  const { data } = useListAddressBook(network);
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
        <Typography variant="h3" color="primary">
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
          <AddressBookTable network={network} addressBookItems={data} />
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
