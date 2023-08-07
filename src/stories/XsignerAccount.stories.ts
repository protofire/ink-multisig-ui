import type { Meta, StoryObj } from "@storybook/react";

import { XsignerAccountUI } from "@/components/XsignerAccountInfoWidget";
import { CHAINS_COLORS } from "@/config/chain";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Layout/XsigneAccountUI",
  component: XsignerAccountUI,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof XsignerAccountUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const address = "5CQnnhbG8hSwXkzFXm6C5y8okSX6xMa1kjs2UaCHXc5jUE42";
const name = "Amazin-Journey0-wallet";
const networkName = "Rococo testnet";

export const Rococo: Story = {
  args: {
    address,
    name,
    networkColor: CHAINS_COLORS["rococo-contracts-testnet"],
    networkName,
  },
};
