import Image from "next/image";
import * as React from "react";

import { TransactionQueue } from "@/domain/TransactionQueue";
import { truncateAddress } from "@/utils/formatString";

import {
  ListItemtyled,
  StyledBox,
  StyledList,
  StyledStack,
  StyledValueBox,
} from "./styled";

interface Props {
  data: TransactionQueue[] | null;
}

export const TransactionQueueItem = ({ data }: Props) => {
  return (
    <StyledList>
      {data?.map((a, index) => (
        <ListItemtyled key={index}>
          <StyledBox>
            {a.type === "Send" ? (
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
              <span>{a.type}</span>
              <span>{a.timestamp}</span>
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
  );
};
