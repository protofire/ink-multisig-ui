import { Avatar, Stack } from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import * as React from "react";

import CopyButton from "@/components/common/CopyButton";
import OpenNewTabButton from "@/components/common/OpenNewTabButton";
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
  // Remove this mock variable
  const mockURL = "https://polkadot.subscan.io/";

  return (
    <AddressBookWidgetStyled border={false}>
      {data?.length == 0 ? (
        <StyledList>
          <NoItems>There are no registered address in this network</NoItems>
        </StyledList>
      ) : (
        <>
          <StyledList>
            {data?.map((a, index) => {
              const network = getChain(a.networkId);
              return (
                <ListItemstyled key={index}>
                  <StyledBox>
                    <Avatar>
                      <Identicon
                        value={a.address}
                        size={32}
                        theme="beachball"
                      />
                    </Avatar>
                    <StyledStack>
                      <span>{shortNameLonger(a.name as string)}</span>
                      <p>{truncateAddress(a.address as string, 12)}</p>
                    </StyledStack>
                    <IconBoxStyled>
                      <CopyButton text={a.address}></CopyButton>
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
            })}
          </StyledList>
          <StyledButton> View All </StyledButton>
        </>
      )}
    </AddressBookWidgetStyled>
  );
};
