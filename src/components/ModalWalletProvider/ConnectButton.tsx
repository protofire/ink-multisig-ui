import * as React from "react";

import { StyledConnectButton } from "@/components/ModalWalletProvider/styled";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useRecentlyClicked } from "@/hooks/useRecentlyClicked";

import { ModalWallet } from "../WalletSelectModal";

export const ConnectButton: React.FC = () => {
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(500);
  const [open, setOpen] = React.useState(false);
  const { wallets } = usePolkadotContext();
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
        handleClose={() => setOpen(false)}
      />
    </>
  );
};
