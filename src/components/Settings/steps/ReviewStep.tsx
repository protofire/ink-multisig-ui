import { Box, Typography } from "@mui/material";
import { ArrayOneOrMore } from "useink/dist/core";

import NetworkBadge from "@/components/NetworkBadge";
import { AccountSigner } from "@/components/StepperSignersAccount/AccountSigner";
import {
  FlexCenterBox,
  StyledBox,
} from "@/components/StepperSignersAccount/styled";
import { getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Owner } from "@/domain/SignatoriesAccount";

function ReviewStep({ owners }: { owners: ArrayOneOrMore<Owner> }) {
  const { network } = usePolkadotContext();
  const { logo, name: networkName } = getChain(network);

  return (
    <Box>
      <Typography variant="h6" component="div" mt={1}>
        You&apos;re about to create a new XSigners Account and will have to
        confirm the transaction with your connected wallet.
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
              Owner
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
        </StyledBox>
      </Box>
    </Box>
  );
}

export default ReviewStep;
