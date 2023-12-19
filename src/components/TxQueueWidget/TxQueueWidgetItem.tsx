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

export const TxQueueWidgetItem = ({ data }: Props) => {
  const value = data.value;
  const date = formatDate(data.creationTimestamp);
  const from = data.from ?? data.contractAddress;
  const approvalCount = data.approvalCount || 0;
  const threshold = data.approvals?.length || 0;
  return (
    <ListItemtyled>
      <StyledBox sx={{ width: "100%" }}>
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
        </StyledBox>
        <StyledValueBox>
          {data.type === TX_TYPE_OPTION.RECEIVE
            ? `+ ${value} ${data.token}`
            : ""}
          {data.type === TX_TYPE_OPTION.SEND ? `- ${value}` : ""}
          <span>
            {approvalCount}/{threshold}
          </span>
        </StyledValueBox>
      </StyledBox>
    </ListItemtyled>
  );
};
