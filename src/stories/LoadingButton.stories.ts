import type { Meta, StoryObj } from "@storybook/react";

import {
  LoadingButton,
  LoadingButtonProps,
} from "@/components/common/LoadingButton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/LoadingButton",
  component: LoadingButton,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Loading Button",
  },
  tags: ["autodocs"],
} satisfies Meta<LoadingButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Text: Story = {
  args: {
    variant: "text",
    size: "small",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    size: "medium",
  },
};

export const Contained: Story = {
  args: {
    variant: "contained",
    size: "large",
  },
};
