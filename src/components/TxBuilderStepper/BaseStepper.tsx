import { Box, BoxProps, Step, Stepper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

import { StyledStepLabel } from "../StepperSignersAccount/styled";
import { ManagerActiveStep } from "../StepperSignersAccount/useManagerActiveStep";
import {
  NextBackButtonStepper,
  NextBackButtonStepperProps,
} from "./NextBackButtonStepper";

export type StepType = {
  id: number;
  name: string;
  label?: string;
  Component: React.ReactNode;
};

type BaseStepperProps = {
  steps: StepType[];
  onStepChange: (step: number) => void;
  boxStepperSx?: BoxProps;
  managerStep: ManagerActiveStep;
  footer?: React.ReactNode;
  footerProps?: Partial<NextBackButtonStepperProps>;
};

export const BaseStepper: React.FC<BaseStepperProps> = ({
  steps,
  onStepChange,
  boxStepperSx,
  managerStep,
  footer,
  footerProps,
}) => {
  const theme = useTheme();
  const {
    activeStep: { creation: activeStep },
    downCreationStep: handleBack,
    upCreationStep: handleNext,
  } = managerStep;

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box
        p={5}
        sx={{
          background: theme.palette.grey.A200,
        }}
        {...boxStepperSx}
      >
        <Stepper activeStep={activeStep} orientation="horizontal">
          {steps.map((step, index) => (
            <Step key={index} onClick={() => onStepChange(index)}>
              <StyledStepLabel
                active={step.id === activeStep ? 1 : 0}
                completed={step.id < activeStep ? 1 : 0}
              >
                <Typography>{step.name}</Typography>
              </StyledStepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box sx={{ background: theme.palette.grey.A100 }}>
        <Box>
          <Box p={5} mr={8}>
            {steps[activeStep].label && (
              <Typography variant="h4">{steps[activeStep].label}</Typography>
            )}
            {steps[activeStep].Component}
          </Box>
          {footer || (
            <Box p={5}>
              <NextBackButtonStepper
                activeStep={activeStep}
                steps={steps}
                handleBack={handleBack}
                handleNext={handleNext}
                {...footerProps}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
