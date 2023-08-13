import { Avatar, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Identicon from "@polkadot/react-identicon";

import CopyButton from "@/components/common/CopyButton";
import { truncateAddress } from "@/utils/formatString";

interface Props {
  address: string;
  name: string;
  showCopy?: boolean;
  showExplorer?: boolean;
}

export function AccountSigner({
  address,
  name,
  showCopy = true,
  showExplorer = true,
}: Props) {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="center">
      <Avatar>
        <Identicon value={address} size={32} theme="jdenticon" />
      </Avatar>
      <Box marginLeft={1}>
        <Typography color={theme.palette.common.white} fontSize={14}>
          {name}
        </Typography>
        <Typography display="flex" alignItems="center" gap={1} component="div">
          <Typography fontSize={12}>{truncateAddress(address, 4)}</Typography>
          {showCopy && <CopyButton text={address} />}
        </Typography>
      </Box>
    </Box>
  );
}
