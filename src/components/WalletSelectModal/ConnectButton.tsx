import * as React from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";

import { ModalWallet } from ".";
import { StyledConnectButton } from "./styled";

export const ConnectButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { wallets } = usePolkadotContext();
  const isLoading = false;

  return (
    <>
      <StyledConnectButton isLoading={isLoading} onClick={() => setOpen(true)}>
        Connect
      </StyledConnectButton>
      <ModalWallet
        wallets={wallets}
        open={open}
        handleClose={() => setOpen(false)}
      ></ModalWallet>
    </>
  );
};
