import Link from "next/link";
import * as React from "react";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useListTxQueue } from "@/hooks/txQueue/useListTxQueue";

import {
  NoItems,
  StyledButton,
  StyledList,
  TxQueueWidgetStyled,
} from "./styled";
import { TxQueueWidgetItem } from "./TxQueueWidgetItem";

interface Props {
  xsignerAccount: SignatoriesAccount;
}

export const TxQueueWidget = ({ xsignerAccount }: Props) => {
  const network = getChain(xsignerAccount.networkId);
  const { data, error, isLoading } = useListTxQueue(xsignerAccount, network.id);
  const validator = !data || data.length === 0;
  const owners = xsignerAccount.owners.length;

  return (
    <TxQueueWidgetStyled border={false}>
      {validator ? (
        <StyledList>
          <NoItems>
            {isLoading || data === undefined ? (
              <LoadingSkeleton count={1} />
            ) : (
              error || "There are no transactions in this account"
            )}
          </NoItems>
        </StyledList>
      ) : (
        <>
          <StyledList>
            {data.map((tx, index) => (
              <TxQueueWidgetItem data={tx!} key={index} owners={owners} />
            ))}
          </StyledList>
          <StyledButton LinkComponent={Link} href={ROUTES.Transactions}>
            View All
          </StyledButton>
        </>
      )}
    </TxQueueWidgetStyled>
  );
};
