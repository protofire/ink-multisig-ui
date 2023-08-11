import PeopleIcon from "@mui/icons-material/People";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import * as React from "react";

import { ChainColors, CHAINS_ALLOWED } from "@/config/chain";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useModalBehaviour } from "@/hooks/useModalBehaviour";
import { formatThreshold, truncateAddress } from "@/utils/formatString";

import { SelectXsignerItems } from "./SelectXsignerItems";
import { AccountInfoWrapper } from "./styled";

type Props = Partial<SignatoriesAccount> & {
  networkName: (typeof CHAINS_ALLOWED)[number]["name"];
  ownersCount: number | undefined;
  networkColor: ChainColors[keyof ChainColors] | undefined;
  xsigners?: SignatoriesAccount[];
};

export function XsignerAccountInfoUI({
  address,
  name,
  networkName,
  threshold,
  ownersCount,
  networkColor,
  xsigners,
}: Props) {
  const { isOpen, closeModal, openModal } = useModalBehaviour();

  return (
    <AccountInfoWrapper networkcolor={networkColor}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={"column"}
        height="100%"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            gap="0.2rem"
            flexDirection="column"
            alignItems="center"
          >
            <Avatar>
              <Identicon value={address} size={32} theme="beachball" />
            </Avatar>
            <Tooltip title="Threshold" arrow>
              <Box display="flex" flexDirection="column">
                <PeopleIcon fontSize="small" color="primary" />
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ margin: "-4px 0" }}
                >
                  {formatThreshold({ threshold, owners: ownersCount })}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
          <Box marginLeft={1}>
            <Tooltip title={name} placement="top" arrow>
              <Box
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "10rem",
                }}
              >
                <Typography variant="subtitle1" color="white" noWrap>
                  {name}
                </Typography>
              </Box>
            </Tooltip>
            <Typography color="white" variant="caption">
              {truncateAddress(address, 4)}
              {/* TODO 
            <ContentCopyRoundedIcon fontSize="small" /> */}
            </Typography>

            {/* TODO 
          <Typography color="white" fontWeight="bold">
            124,09 AST
          </Typography> */}
          </Box>
        </Box>
        {xsigners && (
          <SelectXsignerItems
            isOpen={isOpen}
            openModal={openModal}
            closeModal={closeModal}
            xsigners={xsigners}
          />
        )}
        <Box>
          <Typography variant="caption" color="white">
            {networkName}
          </Typography>
        </Box>
      </Box>
    </AccountInfoWrapper>
  );
}
