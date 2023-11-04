import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Avatar, Box, IconButton, SvgIcon, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Identicon from "@polkadot/react-identicon";
import { useRouter } from "next/router";

import CopyButton from "@/components/common/CopyButton";
import { ROUTES } from "@/config/routes";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useListSignersAccount } from "@/hooks/xsignersAccount";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
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
  const router = useRouter();
  const { data } = useListSignersAccount();
  const { setXsigner } = useSetXsignerSelected();

  const handleMultisigRedirect = (address: string) => {
    const selectedMultisig = data?.find(
      (multisig) => multisig.address === address
    ) as SignatoriesAccount;
    setXsigner(selectedMultisig);
    router.replace(ROUTES.App);
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
            <IconButton
              onClick={() => handleMultisigRedirect(address)}
              size="small"
            >
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
