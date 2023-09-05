import { Box, Typography } from "@mui/material";

import AssetsTable from "@/components/AssetsTable";

export default function AssetsPage() {
  return (
    <Box
      p={2}
      mt={4}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Typography mb={1} variant="h3" color="primary">
        Assets
      </Typography>
      <AssetsTable />
    </Box>
  );
}
