import { Box, Typography } from "@mui/material";
import { ArrayOneOrMore } from "useink/dist/core";

import { Owner } from "@/domain/SignatoriesAccount";

function ReviewStep({
  owners,
  threshold,
  walletName,
}: {
  owners: ArrayOneOrMore<Owner>;
  threshold: number;
  walletName: string;
}) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
          flexDirection: "column",
        }}
        mt={2}
        mb={1}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">ink-wallet-name</Typography>
          <Typography variant="body1">{walletName}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Threshold</Typography>
          <Typography variant="body1">
            {threshold} out of {owners.length} owner(s)
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Owners</Typography>
          <Typography variant="body1">{owners.length}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
          flexDirection: "column",
        }}
        mt={2}
        mb={1}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Network fee</Typography>
          {/* This fee needs to be calculated */}
          <Typography variant="body1"> ≈ 0,06318 GOR </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewStep;
