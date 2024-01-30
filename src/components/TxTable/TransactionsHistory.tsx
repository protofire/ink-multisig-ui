import { Box } from "@mui/material";
import React from "react";
import { ChainId } from "useink/dist/chains";

import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useListTxHistory } from "@/hooks/transactions/useListTxHistory";

import { LoadingSkeleton } from "../common/LoadingSkeleton";
import { TxDetailItem } from "./TxDetailItem";

interface Props {
  xsignerAccount: SignatoriesAccount;
  network: ChainId;
}

export const TransactionHistory: React.FC<Props> = ({
  xsignerAccount,
  network,
}) => {
  const { data } = useListTxHistory(xsignerAccount, network);

  if (data === undefined) {
    return (
      <Box mt={2}>
        <LoadingSkeleton count={5} width={"100%"} />
      </Box>
    );
  }

  return (
    <>
      {data.map((txData, index) => {
        return (
          <TxDetailItem
            key={index}
            txData={txData}
            threshold={xsignerAccount.threshold}
            network={network}
          />
        );
      })}
    </>
  );
};
