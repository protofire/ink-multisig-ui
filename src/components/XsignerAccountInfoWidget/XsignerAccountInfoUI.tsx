import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import * as React from "react";

import { ChainColors, CHAINS_ALLOWED } from "@/config/chain";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useModalBehaviour } from "@/hooks/useModalBehaviour";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
import { formatThreshold, truncateAddress } from "@/utils/formatString";

import CopyButton from "../common/CopyButton";
import { SelectXsignerItems } from "./SelectXsignerItems";
import { AccountInfoWrapper } from "./styled";
import { SwitchUserAccount } from "./SwitchUserAccount";

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
  const { setXsigner } = useSetXsignerSelected();
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
                <Typography variant="caption" color="primary">
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
            </Typography>
            <CopyButton text={address as string} />
            {/* TODO 
          <Typography color="white" fontWeight="bold">
            124,09 AST
          </Typography> */}
          </Box>
        </Box>
        {xsigners && (
          <Box sx={{ right: "0", position: "absolute", top: "3rem" }}>
            <SwitchUserAccount
              isOpen={isOpen}
              closeModal={closeModal}
              openModal={openModal}
            />
            <SelectXsignerItems
              xsigners={xsigners}
              isOpen={isOpen}
              closeModal={closeModal}
              onClick={setXsigner}
            />
          </Box>
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
