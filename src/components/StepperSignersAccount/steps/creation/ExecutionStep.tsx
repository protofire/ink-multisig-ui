import { Box, CircularProgress, Typography } from "@mui/material";

import { ValidationError } from "@/hooks/xsignersAccount/useFormSignersAccountState";

import { CREATION_STEPS } from "../../constants";
import { StyledBox } from "../../styled";

function ExecutionStep({
  errors,
  step,
}: {
  errors: Array<Array<ValidationError>>;
  step: number;
}) {
  const hasErrors = errors[step].some((error) => error.error);
  const stepCompleted = CREATION_STEPS.execution.length - 1 === step;

  const renderMessage = () => {
    if (hasErrors) {
      return "There was an error while processing the transaction, please try again.";
    }
    if (!stepCompleted) {
      return "Please wait a few seconds while this is processed";
    }
    return "Your XSigners Account was successfully created!";
  };
  return (
    <Box>
      <StyledBox mt={4} mb={4} gap={4} alignItems="center">
        {!hasErrors && !stepCompleted && <CircularProgress />}
        <Typography variant="caption">{renderMessage()}</Typography>
      </StyledBox>
    </Box>
  );
}

export default ExecutionStep;
