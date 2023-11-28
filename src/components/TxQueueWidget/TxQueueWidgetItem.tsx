import Image from "next/image";
import * as React from "react";

import { ChainColors, CHAINS_TOKENS } from "@/config/chain";
import { TX_TYPE } from "@/config/images";
import { TxQueueType } from "@/domain/repositores/ITxQueueRepository";
import { formatDate, truncateAddress } from "@/utils/formatString";

import {
  ListItemtyled,
  StyledBox,
  StyledStack,
  StyledValueBox,
} from "./styled";

interface Props {
  data: TxQueueType;
  network: string;
}

const txType = {
  Transaction: {
    img: TX_TYPE.RECEIVE,
    type: "Receive",
  },
  Transfer: {
    img: TX_TYPE.SEND,
    type: "Send",
  },
  // EXECUTED_SUCCESS: {
  //   img: TX_TYPE.SEND,
  //   type: "Send",
  // },
  // EXECUTED_FAIL: {
  //   img: TX_TYPE.RECEIVE,
  //   type: "Receive",
  // },
  // Propose: {
  //   img: TX_TYPE.PENDING,
  //   type: "Pending",
  // },
};

type dataType = keyof typeof txType;

// TODO: Fix this type, find correct order, token how manage it?
// TODO Convert balance value
export const TxQueueWidgetItem = ({ data, network }: Props) => {
  const txData = txType[data.__typename as dataType];
  const value = data.value;
  const date = formatDate(data.creationTimestamp);
  const from = data.from ?? data.contractAddress;
  const token =
    data.transferType === "NATIVE"
      ? "ND"
      : CHAINS_TOKENS[network as keyof ChainColors];
  const approvalCount = data?.approvalCount || 0;
  const threshold = data?.approvals?.length || 0;
  return (
    <ListItemtyled>
      <StyledBox>
        <Image
          src={txData?.img}
          alt="Arrow receive"
          priority
          width={30}
          height={30}
        />
        <StyledStack>
          <span>{txData?.type}</span>
          <span>{date}</span>
          <p>{truncateAddress(from, 12)}</p>
        </StyledStack>
        <StyledValueBox>
          {txData?.type === "Send" ? "-" : "+"} {`${value} ${token}`}
          <span>
            {approvalCount}/{threshold}
          </span>
        </StyledValueBox>
      </StyledBox>
    </ListItemtyled>
  );
};
