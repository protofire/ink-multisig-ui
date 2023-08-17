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
  truncateAmount?: number;
}

export function AccountSigner({
  address,
  name,
  showCopy = true,
  truncateAmount = 4,
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
          <Typography fontSize={12}>
            {truncateAddress(address, truncateAmount)}
          </Typography>
          {showCopy && <CopyButton text={address} />}
        </Typography>
      </Box>
    </Box>
  );
}
