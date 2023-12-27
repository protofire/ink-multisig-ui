import { Box, Typography } from "@mui/material";

import { TxDetailItem } from "@/components/TxTable/TxDetailItem";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { useNetworkApi } from "@/hooks/useNetworkApi";

export default function TxDetail() {
  const { network } = useNetworkApi();
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
      <TxDetailItem
        data={{} as TransactionProposedItemUi}
        index={0}
        network={network}
      ></TxDetailItem>
    </Box>
  );
}
