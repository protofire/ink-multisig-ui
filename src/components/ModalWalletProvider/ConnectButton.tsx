import { useRouter } from "next/router";
import * as React from "react";
import { ChainId } from "useink/dist/chains";

import { StyledConnectButton } from "@/components/ModalWalletProvider/styled";
import { ROUTES } from "@/config/routes";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { useRecentlyClicked } from "@/hooks/useRecentlyClicked";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

import { AccountSelect } from "../AccountSelect";
import { NetworkSelect } from "../NetworkSelect";
import { ModalWallet } from ".";

export const ConnectButton: React.FC = () => {
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(500);
  const [displayModalWallet, setDisplayModalWallet] = React.useState(false);
  const {
    wallets,
    connectWallet,
    disconnectWallet,
    isConnected,
    accountConnected,
    accounts,
    setAccount,
    setNetwork,
    network,
  } = usePolkadotContext();
  const router = useRouter();
  const { xSignerSelected } = useGetXsignerSelected();
  const redirectRoutes = [ROUTES.New, ROUTES.Load] as string[];

  useEventListenerCallback(WalletConnectionEvents.onWalletConnection, () =>
    setDisplayModalWallet(true)
  );

  const handleNetworkChange = (chainId: ChainId | undefined) => {
    setNetwork(chainId);
    if (
      chainId !== xSignerSelected?.networkId ||
      redirectRoutes.includes(router.pathname)
    ) {
      router.replace(ROUTES.Welcome);
    }
  };

  if (isConnected)
    return (
      <>
        <AccountSelect
          accountConnected={accountConnected}
          accounts={accounts}
          setAccount={setAccount}
          disconnectWallet={disconnectWallet}
        />

        <NetworkSelect currentChain={network} onChange={handleNetworkChange} />
      </>
    );

  return (
    <>
      <StyledConnectButton
        ref={refButton}
        isLoading={recentlyClicked}
        onClick={() => setDisplayModalWallet(true)}
      >
        Connect
      </StyledConnectButton>
      <ModalWallet
        wallets={wallets}
        open={displayModalWallet}
        handleClose={() => setDisplayModalWallet(false)}
        connectWallet={connectWallet}
        onClose={() => setDisplayModalWallet(false)}
      />
    </>
  );
};
