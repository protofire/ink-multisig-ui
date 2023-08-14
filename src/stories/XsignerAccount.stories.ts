import type { Meta, StoryObj } from "@storybook/react";

import { XsignerAccountInfoUI } from "@/components/XsignerAccountInfoWidget/XsignerAccountInfoUI";
import { CHAINS_COLORS } from "@/config/chain";
import { createArrayOneOrMore } from "@/domain/utilityTsTypes";
import { ChainId } from "@/services/useink/types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Layout/XsigneAccountUI",
  component: XsignerAccountInfoUI,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof XsignerAccountInfoUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const address = "5CQnnhbG8hSwXkzFXm6C5y8okSX6xMa1kjs2UaCHXc5jUE42";
const name = "Amazin-Journey0-wallet";
const networkName = "Rococo testnet";
const xsigners = [
  {
    address: "5CQnnhbG8hSwXkzFXm6C5y8okSX6xMa1kjs2UaCHXc5jUE42",
    name: "Amazing-Journey0-wallet",
    owners: createArrayOneOrMore([
      {
        name: "Owner 1",
        address: "5FU2XnxkHeZk49f42UHHiRD69o6jLhm3FxceXFZxkePYshHa",
      },
      {
        name: "Owner 2",
        address: "5E4iKX9jcB1sZyBxHV8Xi69ekHF8oWezyG8kc9dC19m6zoso",
      },
    ]),
    threshold: 2,
    networkId: "rococo-contracts-testnet" as ChainId,
  },
];

export const Rococo: Story = {
  args: {
    address,
    ownersCount: 3,
    name,
    networkColor: CHAINS_COLORS["rococo-contracts-testnet"],
    networkName,
    xsigners,
  },
};
