import { Box } from "@mui/material";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { capitalizeFirstLetter } from "@/utils/formatString";

import TxTabs from "./Tabs";
import { TransactionHistory } from "./TransactionsHistory";
import { TransactionQueueDetail } from "./TransactionsQueueDetail";

interface Props {
  xsignerAccount: SignatoriesAccount;
  types: string[];
  value: number;
  handleChange: (_: React.SyntheticEvent, newValue: number) => void;
}

export function TxTable({ xsignerAccount, types, value, handleChange }: Props) {
  const { network } = usePolkadotContext();
  return (
    <Box sx={{ width: "100%" }}>
      <TxTabs
        value={value}
        options={types.map((t) => capitalizeFirstLetter(t))}
        onChange={handleChange}
      >
        {value === 0 ? (
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
