import { Avatar, Stack } from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import * as React from "react";

import CopyButton from "@/components/common/CopyButton";
import OpenNewTabButton from "@/components/common/OpenNewTabButton";
import { ChainExtended } from "@/config/chain";
import { AddressBook } from "@/domain/AddressBooks";
import { shortNameLonger, truncateAddress } from "@/utils/formatString";

import {
  IconBoxStyled,
  ListItemstyled,
  NetworkBoxStyled,
  StyledBox,
  StyledStack,
} from "./styled";

interface Props {
  addressBook: AddressBook | null;
  network: ChainExtended;
}

export const AddressBookItem = ({ addressBook, network }: Props) => {
  // TODO:
  // Remove this mock variable, replace with true value
  const mockURL = "https://polkadot.subscan.io/";
  return (
    <ListItemstyled>
      <StyledBox>
        <Avatar>
          <Identicon value={addressBook?.address} size={32} theme="beachball" />
        </Avatar>
        <StyledStack>
          <span>{shortNameLonger(addressBook?.name as string)}</span>
          <p>{truncateAddress(addressBook?.address, 12)}</p>
        </StyledStack>
        <IconBoxStyled>
          <CopyButton text={addressBook?.address as string}></CopyButton>
          <OpenNewTabButton text={mockURL} />
        </IconBoxStyled>
        <NetworkBoxStyled>
          <Avatar src={network?.logo.src} alt={network?.logo.alt} />
          <Stack>
            <p>{network?.name}</p>
          </Stack>
        </NetworkBoxStyled>
      </StyledBox>
    </ListItemstyled>
  );
};
