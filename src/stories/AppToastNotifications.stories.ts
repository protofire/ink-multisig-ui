import "react-toastify/dist/ReactToastify.css";

import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "react-toastify";

import { AppToastNotificationUI } from "@/components/AppToastNotification/AppToastNotificationUI";

const meta: Meta<typeof AppToastNotificationUI> = {
  title: "Common/CustomToast",
  component: AppToastNotificationUI,
  args: {
    autoClose: 99999,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export default meta;
type Story = StoryObj<typeof AppToastNotificationUI>;

export const Default: Story = {
  play: async () => {
    toast("Default notification");
  },
};

export const Success: Story = {
  play: async () => {
    toast.success("Success notification");
  },
};

export const Error: Story = {
  play: async () => {
    toast.error("Error notification");
  },
};

export const Info: Story = {
  play: async () => {
    toast.info("Infor notification");
  },
};
