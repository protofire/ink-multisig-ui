import { Box, Typography } from "@mui/material";

import { TxFunctionsForm } from "@/components/TxFunctionsForm";

export default function TxBuilderPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Typography mb={4} variant="h3" color="primary">
        Transaction builder
      </Typography>
      <TxFunctionsForm />;
    </Box>
  );
}
