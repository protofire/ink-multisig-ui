import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { TopBar } from "@/components/layout/TopBar";
import { StyledConnectButton } from "@/components/ModalWalletProvider/styled";

const meta = {
  title: "Layout/TopBar",
  component: TopBar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Button: React.FC = () => (
  <StyledConnectButton onClick={() => alert("Action")}>
    Action
  </StyledConnectButton>
);

export const Default: Story = {
  args: {
    buttonActionComponent: <Button />,
  },
};
