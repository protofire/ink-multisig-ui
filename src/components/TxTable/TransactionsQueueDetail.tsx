import { Box } from "@mui/material";
import router from "next/router";
import React from "react";
import { ChainId } from "useink/dist/chains";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useListTxQueue } from "@/hooks/transactions/useListTxQueue";

import { ModalTxExecution } from "./ModalTxExecution";
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
  const { transactionToProcess } = useRemovedTxIds({
    data,
    callback: () => openModal(),
  });

  if (data === undefined || multisigContractPromise?.contract === undefined) {
    return (
      <Box mt={2}>
        <LoadingSkeleton count={5} width={"100%"} />
      </Box>
    );
  }

  const replaceURLParam = (paramValue: string, paramKey?: "tab") => {
    const newQueryParams = { ...router.query };

    newQueryParams[paramKey] = paramValue;

    router.replace(
      {
        pathname: router.pathname,
        query: newQueryParams,
      },
      undefined,
      { shallow: true }
    );
  };

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
        transactionToProcess={transactionToProcess}
        onConfirmText="Go to history"
        onConfirm={() => replaceURLParam("history")}
      />
    </>
  );
};
