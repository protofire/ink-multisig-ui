import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useFormSignersAccountState } from "@/hooks/signatoriesAccount/useFormSignersAccountState";

import { STEPS } from "./constants";

type StepperNewSignersAccountProps = {
  save: (props: SignatoriesAccount) => void;
  isExecuting: boolean;
};

type SignatoriesAccount = {
  // define structure here
};

function StepperNewSignersAccount({
  save,
  isExecuting,
}: StepperNewSignersAccountProps) {
  const [activeStep, setActiveStep] = useState(0);
  const data = useFormSignersAccountState();
  const handleNext = () => {
    const isLastStep = activeStep === STEPS.length - 1;
    if (isLastStep) {
      //TODO: Add logic to call save fn and show creating account screen.
      save(data);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    const isFirstStep = activeStep === 0;
    if (isFirstStep) {
      //TODO: Add logic to go back to previous screen.
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const renderStepContent = (step: number, footer: JSX.Element) => {
    const { Component } = STEPS[step];
    return <Component {...data} footer={footer} step={step} />;
  };

  const renderFooter = () => (
    <Box
      mt={2}
      sx={{ display: "flex", flex: 1, justifyContent: "center", gap: "2rem" }}
    >
      <Button onClick={handleBack}>
        {activeStep === STEPS.length - 1 || activeStep === 0
          ? "Cancel"
          : "Back"}
      </Button>
      {activeStep <= STEPS.length - 1 && (
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={data.errors[activeStep]?.error}
        >
          {activeStep === STEPS.length - 1 ? "Confirm" : "Next"}
        </Button>
      )}
    </Box>
  );
  return (
    <Box display="flex" flexDirection="row">
      <Box width={2 / 4}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {STEPS.map((step) => (
            <Step key={step.id}>
              <StepLabel>
                <Typography>{step.name}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="subtitle2">{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box width={2 / 4} p={2}>
        {renderStepContent(activeStep, renderFooter())}
      </Box>
    </Box>
  );
}

export default StepperNewSignersAccount;
