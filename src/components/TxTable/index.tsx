import { Box } from "@mui/material";
import { useState } from "react";

import { TX_TYPE } from "@/config/images";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import {
  TransactionType,
  TransferType,
} from "@/domain/repositores/ITxQueueRepository";
import { TxTypes, useListTxQueue } from "@/hooks/txQueue/useListTxQueue";

import { LoadingSkeleton } from "../common/LoadingSkeleton";
import TxTabs from "./Tabs";
import { ExtendedDataType, TxDetailItem } from "./TxDetailItem";

const types = ["transaction", "transfer"];

const txTypes = {
  // EXECUTED_SUCCESS: {
  //   img: TX_TYPE.SEND,
  //   type: "Send",
  // },
  // EXECUTED_FAIL: {
  //   img: TX_TYPE.RECEIVE,
  //   type: "Receive",
  // },
  // PROPOSED: {
  //   img: TX_TYPE.PENDING,
  //   type: "Pending",
  // },
};

const getTransferType = (currentAccount: string, to: string) => {
  const receive = {
    img: TX_TYPE.RECEIVE,
    type: "Receive",
    txMsg: "from",
    state: "Successfull",
  };
  const send = {
    img: TX_TYPE.SEND,
    type: "Send",
    txMsg: "to",
  };
  return currentAccount == to ? receive : send;
};

const buildDataDetail = (
  currentAccount: string,
  data: TransferType | TransactionType
): ExtendedDataType => {
  if (data.__typename === "Transaction") {
    const parsedData = data as TransactionType;
    const type = getTransferType(currentAccount, parsedData.proposer);
    return {
      ...parsedData,
      ...type,
      to: parsedData.contractAddress,
      txMsg: "to",
      txStateMsg: "Awaiting confirmations",
    };
  } else {
    const parsedData = data as TransferType;
    const type = getTransferType(currentAccount, parsedData.to);
    return {
      ...parsedData,
      ...type,
      txStateMsg: "Success",
    };
  }
};

export default function TxTable() {
  const [type, setType] = useState(types[0]);
  const { accountConnected } = usePolkadotContext();
  const { listTxByType } = useListTxQueue(accountConnected?.address);
  const handleChange = (newValue: number) => {
    setType(types[newValue]);
    console.log("type", type);
  };

  const tableData = listTxByType(type as TxTypes);

  const HARDCODED_ADDRESS = "WVD2RehkWDtEovfmozEy9644WikGyJ7fFH7YUDSXgfBECXg";
  return (
    <Box sx={{ width: "100%" }}>
      <TxTabs options={["Queue", "History"]} onChange={handleChange}>
        {tableData !== undefined ? (
          <>
            {tableData.map((data, index) => {
              const detailedData = buildDataDetail(HARDCODED_ADDRESS, data);
              return (
                <>
                  <div>
                    <h2>{data.__typename}</h2>
                  </div>
                  <TxDetailItem
                    data={detailedData}
                    index={index}
                  ></TxDetailItem>
                </>
              );
            })}
          </>
        ) : (
          <Box mt={2}>
            <LoadingSkeleton count={10} />
          </Box>
        )}
      </TxTabs>
    </Box>
  );
}
