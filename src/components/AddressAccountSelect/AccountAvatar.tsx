import { Avatar, Box } from "@mui/material";
import Identicon from "@polkadot/react-identicon";

interface Props {
  address: string;
}

export function AccountAvatar({ address }: Props) {
  return (
    <Box display="flex" alignItems="center">
      <Avatar>
        <Identicon value={address} size={32} theme="polkadot" />
      </Avatar>
      <Box marginLeft={1}>{address}</Box>
    </Box>
  );
}
