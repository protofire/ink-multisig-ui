import Image from "next/image";
import * as React from "react";

import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { TX_TYPE_OPTION } from "@/hooks/txQueue/useListTxQueue";
import { formatDate, truncateAddress } from "@/utils/formatString";

import {
  ListItemtyled,
  StyledBox,
  StyledStack,
  StyledValueBox,
} from "./styled";

interface Props {
  data: TransactionProposedItemUi;
  owners: number;
}

export const TxQueueWidgetItem = ({ data, owners }: Props) => {
  const date = formatDate(data.creationTimestamp);
  const from = data.contractAddress;
  const approvalCount = data.approvalCount;

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
          {data.type === TX_TYPE_OPTION.RECEIVE ? `+` : "-"}
          {`${data.valueAmount}`}
          <span>
            {approvalCount}/{owners}
          </span>
        </StyledValueBox>
      </StyledBox>
    </ListItemtyled>
  );
};
