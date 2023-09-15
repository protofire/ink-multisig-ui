import { Box, Typography } from "@mui/material";

import TxTable from "@/components/TxTable";

export default function TxPage() {
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
        Transactions
      </Typography>
      <TxTable />
    </Box>
  );
}
