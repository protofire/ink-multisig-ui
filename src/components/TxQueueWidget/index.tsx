import * as React from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useListTxQueue } from "@/hooks/txQueue/useListTxQueue";

import {
  NoItems,
  StyledButton,
  StyledList,
  TxQueueWidgetStyled,
} from "./styled";
import { TxQueueWidgetItem } from "./TxQueueWidgetItem";

export const TxQueueWidget = () => {
  const { accountConnected } = usePolkadotContext();
  const { data } = useListTxQueue(accountConnected?.address);
  console.log("data", data);
  return (
    <TxQueueWidgetStyled border={false}>
      {!data ? (
        <StyledList>
          <NoItems>There are no transactions in this account</NoItems>
        </StyledList>
      ) : (
        <>
          <StyledList>
            {data?.map((tx, index) => (
              <TxQueueWidgetItem data={tx} key={index} />
            ))}
          </StyledList>
          <StyledButton> View All </StyledButton>
        </>
      )}
    </TxQueueWidgetStyled>
  );
};
