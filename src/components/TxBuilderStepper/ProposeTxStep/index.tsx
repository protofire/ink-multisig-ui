import { Box } from "@mui/material";

import { NextBackButtonStepper } from "../NextBackButtonStepper";
import { useTxBuilderContext } from "../TxBuilderContext";

export function ProposeTxStep() {
  const { inputFormManager, managerStep } = useTxBuilderContext();
  const {
    activeStep: { creation: activeStep },
    downCreationStep: handleBack,
    upCreationStep: handleNext,
    stepsLength,
  } = managerStep;

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      <Box p={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={handleNext}
          hiddenBack={activeStep === 0 ? true : false}
          nextButtonProps={{
            disabled: false,
          }}
        />
      </Box>
    </Box>
  );
}
