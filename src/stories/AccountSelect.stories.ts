import type { Meta, StoryObj } from "@storybook/react";

import { AccountSelect } from "@/components/ModalWalletProvider/AccountSelect";
import { WalletAccount } from "@/services/useink/types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Layout/AccountSelect",
  component: AccountSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AccountSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccountList: Story = {
  args: {
    accounts: [
      {
        address: "5FpWVjTfDzqwzzc6kPZzHQFEsfikd8JCVnEUkBcXkQKWYw8B",
      },
      {
        address: "5HGoxwXf22nczY4gWJRmo1NACNWTFFQSF3wsZvm2UpJx2Fpx",
      },
    ] as WalletAccount[],
    currentAccount: "5FpWVjTfDzqwzzc6kPZzHQFEsfikd8JCVnEUkBcXkQKWYw8B",
  },
};
