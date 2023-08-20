import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { Avatar, Stack } from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import * as React from "react";

import { getChain } from "@/config/chain";
import { shortNameLonger, truncateAddress } from "@/utils/formatString";

import {
  AddressBookWidgetStyled,
  IconBoxStyled,
  ListItemtyled,
  NetworkBoxStyled,
  StyledBox,
  StyledButton,
  StyledList,
} from "./styled";

export const AddressBookWidget = () => {
  const data = [
    {
      address: "5FpWVjTfDzqwzzc6kPZzHQFEsfikd8JCVnEUkBcXkQKWYw8B",
      name: "Protofire Accounts",
      chain: getChain("astar"),
    },
    {
      address: "5FWbLCgqF3VHhGPJjnTp3RwB8yW3Zf4wcLv1NMqLEEJaaMNS",
      name: "Protofire Accounts",
      chain: getChain("shibuya-testnet"),
    },
    {
      address: "5HGoxwXf22nczY4gWJRmo1NACNWTFFQSF3wsZvm2UpJx2Fpx",
      name: "Protofire Accounts",
      chain: getChain("astar"),
    },
    {
      address: "5DArcAaciV7pV8ymGMa6d1Nw65BpWbkG1B5qAvFFLii4gFE6",
      name: "Protofire Accounts",
      chain: getChain("shibuya-testnet"),
    },
  ];
  return (
    <AddressBookWidgetStyled border={false}>
      <StyledList>
        {data.map((a, index) => (
          <ListItemtyled key={index}>
            <StyledBox>
              <Identicon value={a.address} theme="polkadot" />
              <Stack
                sx={{
                  marginLeft: "1.5rem",
                  minWidth: "100px",
                  width: "280px",
                }}
              >
                <span>{shortNameLonger(a.name as string)}</span>
                <p>{truncateAddress(a.address as string, 12)}</p>
              </Stack>
              <IconBoxStyled>
                <ContentCopyRoundedIcon onClick={() => undefined} />
                <ArrowOutwardIcon onClick={() => undefined} />
              </IconBoxStyled>
              <NetworkBoxStyled>
                <Avatar
                  sx={{
                    width: "25px",
                    height: "25px",
                  }}
                  src={a.chain?.logo.src}
                  alt={a.chain?.logo.alt}
                />
                <Stack>
                  <p>{a.chain?.name}</p>
                </Stack>
              </NetworkBoxStyled>
            </StyledBox>
          </ListItemtyled>
        ))}
      </StyledList>
      <StyledButton
        style={{
          color: "#FFE873",
        }}
      >
        {" "}
        View All{" "}
      </StyledButton>
    </AddressBookWidgetStyled>
  );
};
