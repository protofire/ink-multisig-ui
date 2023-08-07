import { type Meta } from "@storybook/react";
import { useState } from "react";

import { ModalWallet } from "@/components/WalletSelectModal";
import { StyledConnectButton } from "@/components/WalletSelectModal/styled";
import { Wallet } from "@/infrastructure/useink/walletTypes";

import mockData from "./mockData.json";

const meta = {
  title: "Example/WalletModal",
  component: ModalWallet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ModalWallet>;

const ModalFlow = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledConnectButton onClick={() => setOpen(true)}>
        Connect
      </StyledConnectButton>
      <ModalWallet
        handleClose={() => setOpen(false)}
        wallets={mockData as Wallet[]}
        open={open}
        setCurrentWallet={() => undefined}
      />
    </>
  );
};

export default meta;
export const Primary = ModalFlow.bind({});
