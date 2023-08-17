import type { Meta, StoryObj } from "@storybook/react";

import NetworkBadge from "@/components/NetworkBadge";
import { CHAINS_ALLOWED } from "@/config/chain";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/NetworkBadge",
  component: NetworkBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NetworkBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    name: CHAINS_ALLOWED[0].name,
    logo: CHAINS_ALLOWED[0].logo.src,
    logoSize: { width: 14, height: 14 },
    description: CHAINS_ALLOWED[0].logo.alt,
  },
};
