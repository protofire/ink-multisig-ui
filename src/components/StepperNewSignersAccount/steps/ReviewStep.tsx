import { Box, Typography } from "@mui/material";
import { ArrayOneOrMore } from "useink/dist/core";

import { Owner } from "@/domain/SignatoriesAccount";

import { FlexCenterBox, StyledBox } from "../styled";

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
      <StyledBox mt={2} mb={1}>
        <FlexCenterBox>
          <Typography variant="h6">ink-wallet-name</Typography>
          <Typography variant="body1">{walletName}</Typography>
        </FlexCenterBox>
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
        <FlexCenterBox>
          <Typography variant="h6">Owners</Typography>
          <Typography variant="body1">{owners.length}</Typography>
        </FlexCenterBox>
      </StyledBox>
      <StyledBox mt={2} mb={1}>
        <FlexCenterBox>
          <Typography variant="h6">Network fee</Typography>
          {/* This fee needs to be calculated */}
          <Typography variant="body1"> ≈ 0,06318 GOR </Typography>
        </FlexCenterBox>
      </StyledBox>
    </Box>
  );
}

export default ReviewStep;
