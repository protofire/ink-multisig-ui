import { Box, Typography } from "@mui/material";

import { StyledBox } from "../styled";

function ExecutionStep() {
  return (
    <Box>
      <StyledBox mt={2} mb={1} gap={4}>
        <Typography variant="caption">
          Please wait a few seconds while this is processed
        </Typography>
      </StyledBox>
    </Box>
  );
}

export default ExecutionStep;
