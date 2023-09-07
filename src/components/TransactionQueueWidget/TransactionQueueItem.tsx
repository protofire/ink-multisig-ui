import Image from "next/image";
import * as React from "react";

import { TransactionQueue } from "@/domain/TransactionQueue";
import { truncateAddress } from "@/utils/formatString";

import {
  ListItemtyled,
  StyledBox,
  StyledStack,
  StyledValueBox,
} from "./styled";

interface Props {
  data: TransactionQueue | undefined;
}

export const TransactionQueueItem = ({ data: tx }: Props) => {
  return (
    <ListItemtyled>
      <StyledBox>
        {tx?.type === "Send" ? (
          <Image
            src="/assets/arrow-receive.svg"
            alt="Arrow receive"
            priority
            width={30}
            height={30}
          />
        ) : (
          <Image
            src="/assets/arrow-send.svg"
            alt="Arrow receive"
            priority
            width={30}
            height={30}
          />
        )}
        <StyledStack>
          <span>{tx?.type}</span>
          <span>{tx?.timestamp}</span>
          <p>{truncateAddress(tx?.address as string, 12)}</p>
        </StyledStack>
        <StyledValueBox>
          {tx?.type === "Send" ? "-" : "+"} {`${tx?.value} ${tx?.token}`}
          <span>
            {tx?.txValidation}/{tx?.txValidation}
          </span>
        </StyledValueBox>
      </StyledBox>
    </ListItemtyled>
  );
};
