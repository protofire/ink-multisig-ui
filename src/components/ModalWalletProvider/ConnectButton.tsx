import { Avatar } from "@mui/material";
import * as React from "react";

import { StyledConnectButton } from "@/components/ModalWalletProvider/styled";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useRecentlyClicked } from "@/hooks/useRecentlyClicked";

import { AccountSelect } from "../AccountSelect";
import { ModalWallet } from ".";

export const ConnectButton: React.FC = () => {
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(500);
  const [open, setOpen] = React.useState(false);
  const {
    wallets,
    connectWallet,
    disconnectWallet,
    isConnected,
    accountConnected,
    accounts,
    setAccount,
  } = usePolkadotContext();

  if (isConnected)
    return (
      <>
        {/* just to see which wallet was connected to*/}
        <Avatar
          style={{ marginRight: "1rem" }}
          src={accountConnected?.wallet?.logo.src}
        ></Avatar>
        {/*remove later*/}
        <AccountSelect
          currentAccount={accountConnected?.address}
          accounts={accounts}
          setAccount={setAccount}
          disconnectWallet={disconnectWallet}
        />
      </>
    );

  return (
    <>
      <StyledConnectButton
        ref={refButton}
        isLoading={recentlyClicked}
        onClick={() => setOpen(true)}
      >
        Connect
      </StyledConnectButton>
      <ModalWallet
        wallets={wallets}
        open={open}
        connectWallet={connectWallet}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
