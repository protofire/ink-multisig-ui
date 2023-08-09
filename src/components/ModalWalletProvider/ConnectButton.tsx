import { Avatar } from "@mui/material";
import * as React from "react";

import { StyledConnectButton } from "@/components/ModalWalletProvider/styled";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { useRecentlyClicked } from "@/hooks/useRecentlyClicked";

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
  } = usePolkadotContext();

  useEventListenerCallback(WalletConnectionEvents.onWalletConnection, () =>
    setDisplayModalWallet(true)
  );

  if (isConnected)
    return (
      <>
        {/* just to see which wallet was connected to*/}
        <Avatar
          style={{ marginRight: "1rem" }}
          src={accountConnected?.wallet?.logo.src}
        ></Avatar>
        {/*remove later*/}

        <StyledConnectButton onClick={disconnectWallet}>
          Disconnect
        </StyledConnectButton>
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
        connectWallet={connectWallet}
        onClose={() => setDisplayModalWallet(false)}
      />
    </>
  );
};
