import Link from "next/link";
import * as React from "react";

import { getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
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
  const network = getChain(xSignerSelected?.networkId);
  const { listTxByType } = useListTxQueue(xSignerSelected?.address, network.id);
  const data = listTxByType("queue");
  const validator = !data || data.length === 0;
  const owners = xSignerSelected?.owners.length || 0;

  return (
    <TxQueueWidgetStyled border={false}>
      {validator ? (
        <StyledList>
          <NoItems>There are no transactions in this account</NoItems>
        </StyledList>
      ) : (
        <>
          <StyledList>
            {data.map((tx, index) => (
              <TxQueueWidgetItem data={tx!} key={index} owners={owners} />
            ))}
          </StyledList>
          <StyledButton LinkComponent={() => <Link href={ROUTES.TxDetails} />}>
            View All
          </StyledButton>
        </>
      )}
    </TxQueueWidgetStyled>
  );
};
