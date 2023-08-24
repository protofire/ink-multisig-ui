import { Avatar, Box, Typography } from "@mui/material";
import Identicon from "@polkadot/react-identicon";

import { truncateAddress } from "@/utils/formatString";

interface Props {
  address: string;
}

export function AccountAvatar({ address }: Props) {
  return (
    <Box display="flex" alignItems="center">
      <Avatar>
        <Identicon value={address} size={32} theme="beachball" />
      </Avatar>
      <Box marginLeft={1}>
        <Typography color="white">{truncateAddress(address, 4)}</Typography>
      </Box>
    </Box>
  );
}
