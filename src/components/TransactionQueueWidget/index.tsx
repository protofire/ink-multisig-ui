import Image from "next/image";
import * as React from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useTransactionQueue } from "@/hooks/transactionQueue/useTransactionQueue";
import { truncateAddress } from "@/utils/formatString";

import {
  ListItemtyled,
  NoItems,
  StyledBox,
  StyledButton,
  StyledList,
  StyledStack,
  StyledValueBox,
  TransactionQueueStyled,
} from "./styled";

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
          <StyledList>
            {data?.map((a, index) => (
              <ListItemtyled key={index}>
                <StyledBox>
                  {a.type === "Send" ? (
                    <Image
                      src="/assets/arrow-receive.svg"
                      alt="Arrow receive"
                      priority
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image
                      src="/assets/arrow-send.svg"
                      alt="Arrow receive"
                      priority
                      width={40}
                      height={40}
                    />
                  )}
                  <StyledStack>
                    <span>{a.type}</span>
                    <p>{truncateAddress(a.address as string, 12)}</p>
                  </StyledStack>
                  <StyledValueBox>
                    {a.type === "Send" ? "-" : "+"} {`${a.value} ${a.token}`}
                    <span>
                      {a.txValidation}/{a.txValidation}
                    </span>
                  </StyledValueBox>
                </StyledBox>
              </ListItemtyled>
            ))}
          </StyledList>
          <StyledButton> View All </StyledButton>
        </>
      )}
    </TransactionQueueStyled>
  );
};
