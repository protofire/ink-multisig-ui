import { Box } from "@mui/material";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { capitalizeFirstLetter } from "@/utils/formatString";

import TxTabs from "./Tabs";
import { TransactionHistory } from "./TransactionsHistory";
import { TransactionQueueDetail } from "./TransactionsQueueDetail";

export const TAB_TX = ["queue", "history"] as const;
export type TxTabType = (typeof TAB_TX)[number];

interface Props {
  xsignerAccount: SignatoriesAccount;
  tabSelected: TxTabType;
  handleChange: (_: React.SyntheticEvent, newValue: number) => void;
}

export function TxTable({ xsignerAccount, tabSelected, handleChange }: Props) {
  const { network } = usePolkadotContext();
  return (
    <Box sx={{ width: "100%" }}>
      <TxTabs
        value={tabSelected}
        options={TAB_TX.map((t) => capitalizeFirstLetter(t))}
        onChange={handleChange}
      >
        {tabSelected === "queue" ? (
          <TransactionQueueDetail
            xsignerAccount={xsignerAccount}
            network={network}
          />
        ) : (
          <TransactionHistory
            xsignerAccount={xsignerAccount}
            network={network}
          />
        )}
      </TxTabs>
    </Box>
  );
}
