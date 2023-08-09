import type { Meta, StoryObj } from "@storybook/react";

import { ModalWallet } from "@/components/ModalWalletProvider";

import { mockWalletType } from "./walletsMocked";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Layout/ModalWalletProvider",
  component: ModalWallet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ModalWallet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Installed: Story = {
  args: {
    open: true,
    // wallets: Array(4).fill(mockWalletType(true)),
    wallets: [
      mockWalletType({ title: "Polkadot-js", installed: true }),
      mockWalletType({ title: "Talisman", installed: true }),
      mockWalletType({ title: "SubWallet", installed: true }),
      mockWalletType({ title: "Enkrypt", installed: true }),
    ],
  },
};

export const NoInstalled: Story = {
  args: {
    open: true,
    wallets: [
      mockWalletType({ title: "Polkadot-js", installed: false }),
      mockWalletType({ title: "Talisman", installed: false }),
      mockWalletType({ title: "SubWallet", installed: false }),
      mockWalletType({ title: "Enkrypt", installed: false }),
    ],
  },
};

export const Both: Story = {
  args: {
    open: true,
    wallets: [
      mockWalletType({ title: "Polkadot-js", installed: false }),
      mockWalletType({ title: "Talisman", installed: false }),
      mockWalletType({ title: "SubWallet", installed: true }),
      mockWalletType({ title: "Enkrypt", installed: true }),
    ],
  },
};
