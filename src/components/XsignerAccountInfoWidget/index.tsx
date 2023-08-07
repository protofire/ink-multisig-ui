import { Box, BoxProps, styled } from "@mui/material";

import { ChainColors, CHAINS_COLORS, getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

import { XsignerAccountAvatar } from "./XsignerAccountAvatar";

export const AccountInfoWrapper = styled(Box)<
  BoxProps & { networkcolor: string | undefined }
>(({ theme, networkcolor }) => {
  const _networkColor = networkcolor
    ? networkcolor
    : theme.palette.background.default;
  return {
    backgroundColor: theme.palette.background.default,
    minHeight: theme.spacing(20),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${_networkColor} 150%, ${_networkColor} )`,
  };
});

export function XsignerAccountUI({
  networkColor,
  address,
  name,
}: {
  networkColor: ChainColors[keyof ChainColors] | undefined;
  networkName: string;
  address: string;
  name: string;
}) {
  return (
    <AccountInfoWrapper networkcolor={networkColor}>
      <XsignerAccountAvatar name={name} address={address} />
    </AccountInfoWrapper>
  );
}

export function XsignerAccountInfoWidget() {
  const { xSignerSelected } = useGetXsignerSelected();
  const { network } = usePolkadotContext();
  const networkColor = (network && CHAINS_COLORS[network]) || undefined;
  const address = xSignerSelected?.address || "-";
  const name = xSignerSelected?.name || "-";
  const networkName = (network && getChain(network)) || "-";

  return (
    <XsignerAccountUI
      name={name}
      networkColor={networkColor}
      address={address}
      networkName={networkName as string}
    />
  );
}
