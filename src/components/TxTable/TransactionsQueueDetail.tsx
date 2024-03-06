import { Box } from "@mui/material";
import React from "react";
import { ChainId } from "useink/dist/chains";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { useReplaceURLParam } from "@/hooks/common/useReplaceParam";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useListTxQueue } from "@/hooks/transactions/useListTxQueue";

import { ModalTxExecution } from "./ModalTxExecution";
import { usePendingTxRemoval } from "./ModalTxExecution/useRemovedTxIds";
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
  const { isOpen, closeModal, openModal } = useModalBehaviour();
  const { pendingTransaction } = usePendingTxRemoval({
    data,
    callback: () => openModal(),
  });
  const { replaceUrlParam } = useReplaceURLParam();

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
            threshold={xsignerAccount.threshold}
            network={network}
            multisigContractPromise={multisigContractPromise.contract}
          />
        );
      })}
      <ModalTxExecution
        open={isOpen}
        onClose={closeModal}
        transactionToProcess={pendingTransaction}
        onConfirmText="Go to history"
        onConfirm={() => replaceUrlParam({ name: "tab", value: "history" })}
      />
    </>
  );
};
