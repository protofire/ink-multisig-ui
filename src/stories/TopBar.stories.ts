import type { Meta, StoryObj } from "@storybook/react";

import { TopBar } from "@/components/layout/TopBar";

const meta = {
  title: "Layout/TopBar",
  component: TopBar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
