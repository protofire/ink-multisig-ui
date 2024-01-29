import { Avatar, Stack } from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import * as React from "react";

import CopyButton from "@/components/common/CopyButton";
import OpenNewTabButton from "@/components/common/OpenNewTabButton";
import { ChainExtended } from "@/config/chain";
import { AddressBookItemUi } from "@/domain/AddressBooks";
import { getExplorerUrl } from "@/utils/blockchain";
import { shortNameLonger, truncateAddress } from "@/utils/formatString";

import {
  IconBoxStyled,
  ListItemstyled,
  NetworkBoxStyled,
  StyledBox,
  StyledStack,
} from "./styled";

interface Props {
  addressBook: AddressBookItemUi;
  network: ChainExtended;
}

export const AddressBookItem = ({ addressBook, network }: Props) => {
  return (
    <ListItemstyled>
      <StyledBox>
        <Avatar>
          <Identicon value={addressBook.address} size={32} theme="beachball" />
        </Avatar>
        <StyledStack>
          <span>{shortNameLonger(addressBook.name)}</span>
          <p>{truncateAddress(addressBook.formattedAddress, 12)}</p>
        </StyledStack>
        <IconBoxStyled>
          <CopyButton text={addressBook.formattedAddress}></CopyButton>
          <OpenNewTabButton
            text={getExplorerUrl(network.id, addressBook?.formattedAddress)}
          />
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
