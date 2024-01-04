import { Box } from "@mui/material";
import React from "react";
import { ChainId } from "useink/dist/chains";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
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
  const { multisigContractPromise } = useMultisigContractPromise(
    xsignerAccount.address
  );

  if (data === undefined || multisigContractPromise?.contract === undefined) {
    return (
      <Box mt={2}>
        <LoadingSkeleton count={5} width={"100%"} />
      </Box>
    );
  }

  return (
    <>
      {data.map((txData) => {
        return (
          <TxDetailItem
            key={txData.txId}
            txData={txData}
            network={network}
            multisigContractPromise={multisigContractPromise.contract}
          />
        );
      })}
    </>
  );
};
