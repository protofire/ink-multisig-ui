import Image from "next/image";
import * as React from "react";

import { Tx } from "@/domain/repositores/ITxQueueRepository";
import { truncateAddress } from "@/utils/formatString";

import {
  ListItemtyled,
  StyledBox,
  StyledStack,
  StyledValueBox,
} from "./styled";

interface Props {
  data: Tx | undefined;
}

const txType = {
  EXECUTED_SUCCESS: {
    img: "/assets/arrow-receive.svg",
    type: "Send",
  },
  EXECUTED_FAIL: {
    img: "/assets/arrow-send.svg",
    type: "Receive",
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

export const TxQueueWidgetItem = ({ data }: Props) => {
  const type = data?.status as keyof typeof txType;
  const txData = txType[type];
  const value = 300;
  const token = "ROC";
  const aprovalCount = data?.approvalCount;
  const date = formatDate(data?.lastUpdatedTimestamp as string);

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
          <p>{truncateAddress(data?.proposer as string, 12)}</p>
        </StyledStack>
        <StyledValueBox>
          {txData?.type === "Send" ? "-" : "+"} {`${value} ${token}`}
          <span>
            {aprovalCount}/{aprovalCount}
          </span>
        </StyledValueBox>
      </StyledBox>
    </ListItemtyled>
  );
};
