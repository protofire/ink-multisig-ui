import { Box, Typography } from "@mui/material";

import { TxDetailItem } from "@/components/TxTable/TxDetailItem";
import {
  ExtendedDataType,
  TransactionType,
  TransferType,
} from "@/domain/repositores/ITxQueueRepository";

export default function TxPage(
  data: TransferType | TransactionType,
  index: number
) {
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
      <TxDetailItem data={{} as ExtendedDataType} index={index}></TxDetailItem>
    </Box>
  );
}
