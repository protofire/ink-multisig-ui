import { Box, Typography } from "@mui/material";

import AssetsTable from "@/components/AssetsTable";

export default function AssetsPage() {
  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="60vh"
    >
      <Typography mb={1} variant="h3" color="primary">
        Assets
      </Typography>
      <AssetsTable />
    </Box>
  );
}
