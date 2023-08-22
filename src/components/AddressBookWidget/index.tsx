import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { Avatar, Stack } from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import * as React from "react";

import { getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useListAddressBook } from "@/hooks/addressBook/useListAddressBook";
import { shortNameLonger, truncateAddress } from "@/utils/formatString";

import {
  AddressBookWidgetStyled,
  IconBoxStyled,
  ListItemstyled,
  NetworkBoxStyled,
  NoItems,
  StyledBox,
  StyledButton,
  StyledList,
  StyledStack,
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
          <StyledList>
            {data?.map((a, index) => (
              <ListItemstyled key={index}>
                <StyledBox>
                  <Identicon value={a.address} theme="polkadot" />
                  <StyledStack>
                    <span>{shortNameLonger(a.name as string)}</span>
                    <p>{truncateAddress(a.address as string, 12)}</p>
                  </StyledStack>
                  <IconBoxStyled>
                    <ContentCopyRoundedIcon onClick={() => undefined} />
                    <ArrowOutwardIcon onClick={() => undefined} />
                  </IconBoxStyled>
                  <NetworkBoxStyled>
                    <Avatar
                      src={getChain(a.networkId)?.logo.src}
                      alt={getChain(a.networkId)?.logo.alt}
                    />
                    <Stack>
                      <p>{getChain(a.networkId)?.name}</p>
                    </Stack>
                  </NetworkBoxStyled>
                </StyledBox>
              </ListItemstyled>
            ))}
          </StyledList>
          <StyledButton> View All </StyledButton>
        </>
      )}
    </AddressBookWidgetStyled>
  );
};
