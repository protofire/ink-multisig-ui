import { Box, CircularProgress, Typography } from "@mui/material";

import { StyledBox } from "../../styled";

function ExecutionStep() {
  return (
    <Box>
      <StyledBox mt={4} mb={4} gap={4} alignItems="center">
        <CircularProgress />
        <Typography variant="caption">
          Please wait a few seconds while this is processed
        </Typography>
      </StyledBox>
    </Box>
  );
}

export default ExecutionStep;
