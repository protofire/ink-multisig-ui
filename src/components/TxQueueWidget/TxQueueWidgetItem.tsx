import Image from "next/image";
import * as React from "react";

import { ExtendedDataType } from "@/domain/repositores/ITxQueueRepository";
import { TX_TYPE_OPTION } from "@/hooks/txQueue/useListTxQueue";
import { formatDate, truncateAddress } from "@/utils/formatString";

import {
  ListItemtyled,
  StyledBox,
  StyledStack,
  StyledValueBox,
} from "./styled";

interface Props {
  data: ExtendedDataType;
}

// TODO: Fix this type, find correct order, token how manage it?
// TODO Convert balance value
export const TxQueueWidgetItem = ({ data }: Props) => {
  const value = data.value;
  const date = formatDate(data.creationTimestamp);
  const from = data.from ?? data.contractAddress;
  const approvalCount = data.approvalCount || 0;
  const threshold = data.approvals?.length || 0;
  return (
    <ListItemtyled>
      <StyledBox>
        <Image
          src={data.img}
          alt="Arrow receive"
          priority
          width={30}
          height={30}
        />
        <StyledStack>
          <span>{data.type}</span>
          <span>{date}</span>
          <p>{truncateAddress(from, 12)}</p>
        </StyledStack>
        <StyledValueBox>
          {data.type === TX_TYPE_OPTION.SEND ? "-" : "+"}{" "}
          {`${value} ${data.token}`}
          <span>
            {approvalCount}/{threshold}
          </span>
        </StyledValueBox>
      </StyledBox>
    </ListItemtyled>
  );
};
