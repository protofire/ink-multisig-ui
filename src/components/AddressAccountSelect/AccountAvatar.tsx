import { Avatar, Box, Typography } from "@mui/material";
import Identicon from "@polkadot/react-identicon";

import { shortNameLonger, truncateAddress } from "@/utils/formatString";

interface Props {
  address: string;
  truncateLenght?: number;
  name?: string;
  children?: React.ReactNode;
}

export function AccountAvatar({
  address,
  name,
  truncateLenght = 4,
  children,
}: Props) {
  return (
    <Box display="flex" alignItems="center">
      <Avatar>
        <Identicon value={address} size={32} theme="beachball" />
      </Avatar>
      <Box marginLeft={1}>
        {children ? (
          <Typography color={name === undefined ? "white" : "#636669"}>
            {children}
          </Typography>
        ) : (
          <>
            {name === undefined ? <></> : <span>{shortNameLonger(name)}</span>}
            <Typography color={name === undefined ? "white" : "#636669"}>
              {truncateAddress(address, truncateLenght)}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
