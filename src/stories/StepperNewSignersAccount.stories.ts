import type { Meta, StoryObj } from "@storybook/react";

import StepperNewSignersAccount from "@/components/StepperNewSignersAccount";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/StepperNewSignersAccount",
  component: StepperNewSignersAccount,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof StepperNewSignersAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    save: console.log,
    isExecuting: false,
    networkId: "acala",
  },
};
