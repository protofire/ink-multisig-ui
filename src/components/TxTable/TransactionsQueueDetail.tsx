import { Box } from "@mui/material";
import React from "react";
import { ChainId } from "useink/dist/chains";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useListTxQueue } from "@/hooks/txQueue/useListTxQueue";

import { TxDetailItem } from "./TxDetailItem";

interface Props {
  xsignerAccount: SignatoriesAccount;
  network: ChainId;
}

export const TransactionQueueDetail: React.FC<Props> = ({
  xsignerAccount,
  network,
}) => {
  const { data } = useListTxQueue(xsignerAccount, network);

  if (data === undefined) {
    return (
      <Box mt={2}>
        <LoadingSkeleton count={5} width={"100%"} />
      </Box>
    );
  }

  return (
    <>
      {data.map((txData) => {
        const index = Number(txData.txId);
        return (
          <TxDetailItem
            key={txData.id}
            txData={txData}
            network={network}
            index={index}
          />
        );
      })}
    </>
  );
};
