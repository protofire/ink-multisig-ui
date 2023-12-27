import { Box, Typography } from "@mui/material";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import TxTable from "@/components/TxTable";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

export default function TxPage() {
  const { xSignerSelected } = useGetXsignerSelected();

  if (!xSignerSelected) {
    return <FallbackSpinner />;
  }

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
      <TxTable xsignerAccount={xSignerSelected} />
    </Box>
  );
}
