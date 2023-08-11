import "react-loading-skeleton/dist/skeleton.css";

import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { SummaryCard, SummaryCardProps } from "@/components/SummaryCard";
import { XsignerBalanceText } from "@/components/SummaryCard/XsignerBalanceText";

const meta = {
  title: "Components/SummaryCard",
  component: SummaryCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<SummaryCardProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    captionTitle: "Default Tokens",
    caption: "57",
  },
};

export const LoadingState: Story = {
  args: {
    captionTitle: "Loading Title",
    isLoading: true,
    widthSkeleton: "60%",
  },
};

export const WithCustomComponent: Story = {
  args: {
    captionTitle: "Balance",
    captionComponent: (
      <XsignerBalanceText
        freeBalance="222.3333 DOT"
        reservedBalance="0.000 DOT"
      />
    ),
  },
};
