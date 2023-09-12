import { Box, Typography } from "@mui/material";

import AssetsTable from "@/components/AssetsTable";

export default function AssetsPage() {
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
        Assets
      </Typography>
      <AssetsTable />
    </Box>
  );
}
