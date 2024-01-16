import { Box } from "@mui/material";
import React from "react";
import { ChainId } from "useink/dist/chains";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { MultisigContractEvents } from "@/domain/events/MultisigContractEvents";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useListTxQueue } from "@/hooks/transactions/useListTxQueue";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";

import { ModalTxExecution } from "./ModalTxExecution/indext";
import { useRemovedTxIds } from "./ModalTxExecution/useRemovedTxIds";
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
  const { removedTxIds } = useRemovedTxIds(data);

  useEventListenerCallback(MultisigContractEvents.TransactionExecuted, () => {
    if (removedTxIds) openModal();
  });

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
        transactionId={removedTxIds.join(", ")}
      />
    </>
  );
};
