import { Box } from "@mui/material";
import { useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { capitalizeFirstLetter } from "@/utils/formatString";

import TxTabs from "./Tabs";
import { TransactionHistory } from "./TransactionsHistory";
import { TransactionQueueDetail } from "./TransactionsQueueDetail";

const types = ["queue", "history"];

interface Props {
  xsignerAccount: SignatoriesAccount;
}

export function TxTable({ xsignerAccount }: Props) {
  const [type, setType] = useState(types[0]);
  const { network } = usePolkadotContext();

  const handleChange = (newValue: number) => {
    setType(types[newValue]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TxTabs
        options={types.map((t) => capitalizeFirstLetter(t))}
        onChange={handleChange}
      >
        {type === "queue" ? (
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
