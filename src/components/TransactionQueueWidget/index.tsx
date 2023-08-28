import * as React from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useTransactionQueue } from "@/hooks/transactionQueue/useTransactionQueue";

import {
  NoItems,
  StyledButton,
  StyledList,
  TransactionQueueStyled,
} from "./styled";
import { TransactionQueueItem } from "./TransactionQueueItem";

export const TransactionQueueWidget = () => {
  const { accountConnected } = usePolkadotContext();
  const { data } = useTransactionQueue(accountConnected?.address);
  return (
    <TransactionQueueStyled border={false}>
      {data?.length === 0 ? (
        <StyledList>
          <NoItems>There are no transactions in this account</NoItems>
        </StyledList>
      ) : (
        <>
          <TransactionQueueItem data={data} />
          <StyledButton> View All </StyledButton>
        </>
      )}
    </TransactionQueueStyled>
  );
};
