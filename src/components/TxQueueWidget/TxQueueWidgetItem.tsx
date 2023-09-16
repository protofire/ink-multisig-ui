import Image from "next/image";
import * as React from "react";

import { TX_TYPE } from "@/config/images";
import { Tx } from "@/domain/repositores/ITxQueueRepository";
import { truncateAddress } from "@/utils/formatString";

import {
  ListItemtyled,
  StyledBox,
  StyledStack,
  StyledValueBox,
} from "./styled";

interface Props {
  data: Tx;
  threshold: number;
}

const txType = {
  EXECUTED_SUCCESS: {
    img: TX_TYPE.SEND,
    type: "Send",
  },
  EXECUTED_FAIL: {
    img: TX_TYPE.RECEIVE,
    type: "Receive",
  },
  PENDING: {
    img: TX_TYPE.PENDING,
    type: "Pending",
  },
};

const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const TxQueueWidgetItem = ({ data, threshold }: Props) => {
  const type = data.status as keyof typeof txType;
  const txData = txType[type];
  const value = data.value;
  const token = "ROC";
  const aprovalCount = data.approvalCount;
  const address = data.contractAddress;
  const date = formatDate(data.lastUpdatedTimestamp as string);

  return (
    <ListItemtyled>
      <StyledBox>
        <Image
          src={txData.img}
          alt="Arrow receive"
          priority
          width={30}
          height={30}
        />
        <StyledStack>
          <span>{txData.type}</span>
          <span>{date}</span>
          <p>{truncateAddress(address, 12)}</p>
        </StyledStack>
        <StyledValueBox>
          {txData?.type === "Send" ? "-" : "+"} {`${value} ${token}`}
          <span>
            {aprovalCount}/{threshold}
          </span>
        </StyledValueBox>
      </StyledBox>
    </ListItemtyled>
  );
};
