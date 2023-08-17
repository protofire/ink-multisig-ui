import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArrayOneOrMore } from "useink/dist/core";

import CopyButton from "@/components/common/CopyButton";
import NetworkBadge from "@/components/NetworkBadge";
import { CHAINS_ALLOWED, getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Owner, SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { truncateAddress } from "@/utils/formatString";

import { AccountSigner } from "../AccountSigner";
import { FlexCenterBox, StyledBox } from "../styled";

function ReviewStep({
  owners,
  threshold,
  walletName,
  account,
}: {
  owners: ArrayOneOrMore<Owner>;
  threshold: number;
  walletName: string;
  account?: SignatoriesAccount;
}) {
  const theme = useTheme();
  const { network } = usePolkadotContext();
  const networkName = (network && getChain(network)?.name) || "UNKNOWN";
  const { logo } = CHAINS_ALLOWED.find(
    (chain) => chain.name === networkName
  ) || { logo: { src: "", alt: "" } };
  return (
    <Box>
      <Typography variant="h6" component="div" mt={1}>
        {!account
          ? "You&apos;re about to create a new XSigners Account and will have to confirm the transaction with your connected wallet."
          : "You're about to import a XSigners Account."}
      </Typography>
      <Box display="flex" justifyContent="center">
        <StyledBox mt={3} mb={1} gap={4}>
          <FlexCenterBox>
            <Typography variant="h6" width={200}>
              Network
            </Typography>
            <NetworkBadge
              logo={logo.src}
              description={logo.alt}
              logoSize={{ width: 14, height: 14 }}
              name={networkName}
              showTooltip={false}
            />
          </FlexCenterBox>
          <FlexCenterBox>
            <Typography variant="h6" width={200}>
              Name
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              gap={1}
              component="div"
            >
              <Typography
                color={theme.palette.common.white}
                fontWeight="bold"
                variant="body1"
              >
                {walletName}
              </Typography>
              <CopyButton text={walletName} />
            </Typography>
          </FlexCenterBox>
          {account && (
            <FlexCenterBox>
              <Typography variant="h6" width={200}>
                Address
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                gap={1}
                component="div"
              >
                <Typography
                  color={theme.palette.common.white}
                  fontWeight="bold"
                  variant="body1"
                >
                  {truncateAddress(account.address, 12)}
                </Typography>
                <CopyButton text={account.address} />
              </Typography>
            </FlexCenterBox>
          )}
          <FlexCenterBox>
            <Typography variant="h6" width={200}>
              Owners
            </Typography>
            <Typography component="div">
              {owners.map((owner) => (
                <AccountSigner
                  key={owner.address}
                  name={owner.name}
                  address={owner.address}
                  truncateAmount={12}
                />
              ))}
            </Typography>
          </FlexCenterBox>
          <FlexCenterBox>
            <Typography variant="h6" width={200}>
              Threshold
            </Typography>
            <Typography variant="body1" color={theme.palette.common.white}>
              {threshold} out of {owners.length} owner(s)
            </Typography>
          </FlexCenterBox>
        </StyledBox>
      </Box>
    </Box>
  );
}

export default ReviewStep;
