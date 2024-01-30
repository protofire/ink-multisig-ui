import { Box } from "@mui/material";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useSetInAddressBook } from "@/hooks/useSetInAddressBook";
import { capitalizeFirstLetter } from "@/utils/formatString";

import TxTabs from "./Tabs";
import { TransactionHistory } from "./TransactionsHistory";
import { TransactionQueueDetail } from "./TransactionsQueueDetail";

export const TAB_TX = ["queue", "history"] as const;
export type TxTabType = (typeof TAB_TX)[number];
export const DEFAULT_TAB = 0; // Initial tab index "queue"

interface Props {
  xsignerAccount: SignatoriesAccount;
  tabSelectedIndex: number;
  handleChange: (_: React.SyntheticEvent, newValue: number) => void;
}

export function TxTable({
  xsignerAccount,
  tabSelectedIndex,
  handleChange,
}: Props) {
  const { network } = usePolkadotContext();
  const { findInAddressBook } = useSetInAddressBook();

  return (
    <Box sx={{ width: "100%" }}>
      <TxTabs
        tabSelectedIndex={tabSelectedIndex}
        options={TAB_TX.map((t) => capitalizeFirstLetter(t))}
        onChange={handleChange}
      >
        {tabSelectedIndex === DEFAULT_TAB ? (
          <TransactionQueueDetail
            xsignerAccount={xsignerAccount}
            network={network}
            findInAddressBook={findInAddressBook}
          />
        ) : (
          <TransactionHistory
            xsignerAccount={xsignerAccount}
            network={network}
            findInAddressBook={findInAddressBook}
          />
        )}
      </TxTabs>
    </Box>
  );
}
