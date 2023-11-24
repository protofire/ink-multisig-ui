import { CHAINS_COLORS, getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useListSignersAccount } from "@/hooks/xsignersAccount";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

import { XsignerAccountInfoUI } from "./XsignerAccountInfoUI";

export function XsignerAccountInfoWidget() {
  const { xSignerSelected } = useGetXsignerSelected();
  const { network } = usePolkadotContext();
  const networkColor = (network && CHAINS_COLORS[network]) || undefined;
  const networkName = (network && getChain(network)?.name) || "-";
  const { data } = useListSignersAccount({ networkId: network });
  const address = xSignerSelected?.address || "-";
  const name = xSignerSelected?.name || "-";

  return (
    <XsignerAccountInfoUI
      networkColor={networkColor}
      networkName={networkName}
      name={name}
      address={address}
      threshold={xSignerSelected?.threshold}
      ownersCount={xSignerSelected?.owners?.length}
      xsigners={data}
    />
  );
}
