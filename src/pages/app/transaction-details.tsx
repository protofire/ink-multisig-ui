import { Box, Typography } from "@mui/material";

import {
  ExtendedDataType,
  TxDetailItem,
} from "@/components/TxTable/TxDetailItem";
import { TX_TYPE } from "@/config/images";
import {
  TransactionType,
  TransferType,
} from "@/domain/repositores/ITxQueueRepository";

const types = ["transaction", "transfer"];

//const types = ["transaction", "transfer"];
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
const HARDCODED_ADDRESS = "WVD2RehkWDtEovfmozEy9644WikGyJ7fFH7YUDSXgfBECXg";

export default function TxPage(
  data: TransferType | TransactionType,
  index: number
) {
  const detailedData = buildDataDetail(HARDCODED_ADDRESS, data);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Typography mb={2} variant="h3" color="primary">
        Transaction details
      </Typography>
      <TxDetailItem data={detailedData} index={index}></TxDetailItem>
    </Box>
  );
}
