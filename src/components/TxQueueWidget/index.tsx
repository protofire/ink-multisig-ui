import * as React from "react";

import { useListTxQueue } from "@/hooks/txQueue/useListTxQueue";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

import {
  NoItems,
  StyledButton,
  StyledList,
  TxQueueWidgetStyled,
} from "./styled";
import { TxQueueWidgetItem } from "./TxQueueWidgetItem";

export const TxQueueWidget = () => {
  const { xSignerSelected } = useGetXsignerSelected();
  const { data } = useListTxQueue(xSignerSelected?.address);
  const validator = !data || data.transactions.length === 0;
  return (
    <TxQueueWidgetStyled border={false}>
      {validator ? (
        <StyledList>
          <NoItems>There are no transactions in this account</NoItems>
        </StyledList>
      ) : (
        <>
          <StyledList>
            {data.transactions.map((tx, index) => (
              <TxQueueWidgetItem
                data={tx}
                key={index}
                threshold={data.owners.length}
              />
            ))}
          </StyledList>
          <StyledButton> View All </StyledButton>
        </>
      )}
    </TxQueueWidgetStyled>
  );
};
