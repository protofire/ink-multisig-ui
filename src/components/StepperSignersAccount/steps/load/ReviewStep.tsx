import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArrayOneOrMore } from "useink/dist/core";

import CopyButton from "@/components/common/CopyButton";
import NetworkBadge from "@/components/NetworkBadge";
import { getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Owner } from "@/domain/SignatoriesAccount";
import { truncateAddress } from "@/utils/formatString";

import { AccountSigner } from "../../AccountSigner";
import { FlexCenterBox, StyledBox } from "../../styled";

function ReviewStep({
  walletName,
  owners,
  threshold,
  address,
}: {
  walletName: string;
  owners: ArrayOneOrMore<Owner>;
  threshold: number;
  address: string;
}) {
  const theme = useTheme();
  const { network } = usePolkadotContext();
  const { logo, name: networkName } = getChain(network);

  return (
    <Box>
      <Typography variant="h6" component="div" mt={1}>
        You&apos;re about to import a XSigners Account.
      </Typography>
      <Box display="flex" justifyContent="center">
        <StyledBox mt={3} mb={1} gap={2}>
          <FlexCenterBox>
            <Typography variant="h6" width={200}>
              Network
            </Typography>
            <NetworkBadge
              logo={logo.src}
              description={logo.alt}
              logoSize={{ width: 20, height: 20 }}
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
                {truncateAddress(address, 12)}
              </Typography>
              <CopyButton text={address} />
            </Typography>
          </FlexCenterBox>
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
              {threshold ?? 0} out of {owners.length} owner(s)
            </Typography>
          </FlexCenterBox>
        </StyledBox>
      </Box>
    </Box>
  );
}

export default ReviewStep;
