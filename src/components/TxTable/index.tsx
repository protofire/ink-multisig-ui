import { Box } from "@mui/material";
import { useState } from "react";

import { TX_TYPE } from "@/config/images";
import { TxType } from "@/domain/repositores/ITxQueueRepository";
import { TabTxTypes, useListTxQueue } from "@/hooks/txQueue/useListTxQueue";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

import { LoadingSkeleton } from "../common/LoadingSkeleton";
import TxTabs from "./Tabs";
import { ExtendedDataType, TxDetailItem } from "./TxDetailItem";

const types = ["transaction", "transfer"];

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
  data: TxType
): ExtendedDataType => {
  if (data.__typename === "Transaction") {
    const type = getTransferType(currentAccount, data.proposer);
    return {
      ...data,
      ...type,
      to: data.contractAddress,
      txMsg: "to",
      txStateMsg: "Awaiting confirmations",
    };
  } else {
    const type = getTransferType(currentAccount, data.to);
    return {
      ...data,
      ...type,
      txStateMsg: "Success",
    };
  }
};

export default function TxTable() {
  const [type, setType] = useState(types[0]);
  const { xSignerSelected } = useGetXsignerSelected();
  const { listTxByType } = useListTxQueue(xSignerSelected?.address);
  const handleChange = (newValue: number) => {
    setType(types[newValue]);
  };

  const tableData = listTxByType(type as TabTxTypes);
  console.log("tableData", tableData);
  return (
    <Box sx={{ width: "100%" }}>
      <TxTabs options={["Queue", "History"]} onChange={handleChange}>
        {tableData !== undefined ? (
          <>
            {tableData.map((data, index) => {
              const detailedData = buildDataDetail(
                xSignerSelected?.address ?? "",
                data
              );
              return (
                <>
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
