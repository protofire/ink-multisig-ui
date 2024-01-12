import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Avatar, Box, IconButton, SvgIcon, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Identicon from "@polkadot/react-identicon";

import CopyButton from "@/components/common/CopyButton";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { getExplorerUrl } from "@/utils/blockchain";
import { truncateAddress } from "@/utils/formatString";

interface Props {
  address: string;
  name: string;
  showCopy?: boolean;
  showLink?: boolean;
  truncateAmount?: number;
}

export function AccountSigner({
  address,
  name,
  showCopy = true,
  truncateAmount = 4,
  showLink = true,
}: Props) {
  const theme = useTheme();
  const { network } = usePolkadotContext();

  const handleExplorerUri = (address: string) => {
    const explorerUri = getExplorerUrl(network, address);
    window.open(explorerUri, "_blank");
  };

  return (
    <Box display="flex" alignItems="center">
      <Avatar>
        <Identicon value={address} size={32} theme="beachball" />
      </Avatar>
      <Box marginLeft={1}>
        <Typography color={theme.palette.common.white} fontSize={14}>
          {name}
        </Typography>
        <Typography display="flex" alignItems="center" component="div">
          <Typography fontSize={12}>
            {truncateAddress(address, truncateAmount)}
          </Typography>
          {showCopy && <CopyButton text={address} />}
          {showLink && (
            <IconButton onClick={() => handleExplorerUri(address)} size="small">
              <SvgIcon
                component={OpenInNewIcon}
                inheritViewBox
                sx={{ fontSize: "1rem" }}
              />
            </IconButton>
          )}
        </Typography>
      </Box>
    </Box>
  );
}
