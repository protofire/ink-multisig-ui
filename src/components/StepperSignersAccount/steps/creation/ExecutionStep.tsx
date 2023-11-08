import { Box, CircularProgress, Typography } from "@mui/material";

import { ValidationError } from "@/hooks/xsignersAccount/useFormSignersAccountState";

import { StyledBox } from "../../styled";

function ExecutionStep({
  errors,
  step,
}: {
  errors: Array<Array<ValidationError>>;
  step: number;
}) {
  const hasErrors = errors[step].some((error) => error.error);
  return (
    <Box>
      <StyledBox mt={4} mb={4} gap={4} alignItems="center">
        {!hasErrors && <CircularProgress />}
        <Typography variant="caption">
          {!hasErrors
            ? "Please wait a few seconds while this is processed"
            : "There was an error while processing the transaction, please try again."}
        </Typography>
      </StyledBox>
    </Box>
  );
}

export default ExecutionStep;
