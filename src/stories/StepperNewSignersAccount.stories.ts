import type { Meta, StoryObj } from "@storybook/react";

import { CreateNewAccount } from "@/components/StepperSignersAccount";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/CreateNewAccount",
  component: CreateNewAccount,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof CreateNewAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    save: console.log,
    isExecuting: false,
    onComplete: console.log,
    networkId: "acala",
  },
};
