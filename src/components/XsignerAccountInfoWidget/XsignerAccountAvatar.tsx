import { Avatar, Box, Typography } from "@mui/material";
import Identicon from "@polkadot/react-identicon";

import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { truncateAddress } from "@/utils/formatString";

type Props = Partial<SignatoriesAccount>;

export function XsignerAccountAvatar({ address, name }: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={"column"}
      height="100%"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems={"center"}>
        <Avatar>
          <Identicon value={address} size={32} theme="jdenticon" />
        </Avatar>
        <Box marginLeft={1}>
          <Typography variant="caption" color="white">
            {name}
          </Typography>
          <Typography color="white">{truncateAddress(address, 4)}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="caption" color="white">
          Rococo testnet
        </Typography>
      </Box>
    </Box>
  );
}
