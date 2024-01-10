import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

import { ROUTES } from "@/config/routes";
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
  const router = useRouter();
  const { tab } = router.query;

  if (tab === undefined) {
    router.replace({
      pathname: ROUTES.Transactions,
      query: { tab: types[0] },
    });
  }

  const handleChange = (newValue: number) => {
    setType(types[newValue]);
    router.replace({
      pathname: ROUTES.Transactions,
      query: { tab: types[newValue] },
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TxTabs
        options={types.map((t) => capitalizeFirstLetter(t))}
        onChange={handleChange}
      >
        {type === types[0] ? (
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
