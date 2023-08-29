import * as React from "react";

import { StyledConnectButton } from "@/components/ModalWalletProvider/styled";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { useRecentlyClicked } from "@/hooks/useRecentlyClicked";

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

  useEventListenerCallback(WalletConnectionEvents.onWalletConnection, () =>
    setDisplayModalWallet(true)
  );

  if (isConnected)
    return (
      <>
        <AccountSelect
          accountConnected={accountConnected}
          accounts={accounts}
          setAccount={setAccount}
          disconnectWallet={disconnectWallet}
        />

        <NetworkSelect currentChain={network} onChange={setNetwork} />
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
