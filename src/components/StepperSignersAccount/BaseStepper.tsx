import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Step, Stepper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

import { ROUTES } from "@/config/routes";
import {
  UseFormSignersAccountStateReturn,
  ValidationError,
} from "@/hooks/xsignersAccount/useFormSignersAccountState";

import { StepProps } from "./constants";
import { FooterButton, StepperFooter, StyledStepLabel } from "./styled";
import { ManagerActiveStep } from "./useManagerActiveStep";

export type BaseStepperProps = {
  isExecuting: boolean;
  onCompleteCreation?: () => void;
  steps: StepProps;
  data: UseFormSignersAccountStateReturn;
  managerStep: ManagerActiveStep;
};

function BaseStepper({
  isExecuting,
  onCompleteCreation,
  steps,
  data,
  managerStep,
}: BaseStepperProps) {
  const { activeStep, upCreationStep, downCreationStep } = managerStep;
  const router = useRouter();
  const theme = useTheme();
  const section = isExecuting ? "execution" : "creation";
  const activeSubStep = isExecuting
    ? activeStep.execution
    : activeStep.creation;

  const handleRedirect = (route: string) => {
    router.replace(route);
  };

  const handleNext = () => {
    const isLastStep = activeStep.creation === steps.creation.length - 1;
    if (isLastStep) {
      onCompleteCreation?.();
      if (!steps.execution.length) {
        handleRedirect(ROUTES.App);
      }
      return;
    } else {
      upCreationStep();
    }
  };

  const handleBack = () => {
    const isFirstStep = activeStep.creation === 0;
    if (isFirstStep) {
      handleRedirect(ROUTES.Welcome);
    } else {
      downCreationStep();
    }
  };

  const renderSteps = () => (
    <Stepper activeStep={activeSubStep} orientation="vertical">
      {steps[section].map((step) => (
        <Step key={step.id}>
          <StyledStepLabel
            active={step.id === activeSubStep ? 1 : 0}
            completed={step.id < activeSubStep ? 1 : 0}
          >
            <Typography>{step.name}</Typography>
          </StyledStepLabel>
        </Step>
      ))}
    </Stepper>
  );

  const renderContent = () => {
    const { Component } = steps[section][activeSubStep];
    return <Component {...data} footer={renderFooter()} step={activeSubStep} />;
  };

  const renderFooter = () => {
    if (!isExecuting) {
      return (
        <StepperFooter mt={4}>
          <FooterButton width={134} variant="outlined" onClick={handleBack}>
            {activeStep.creation === steps.creation.length - 1 ||
            activeStep.creation === 0 ? (
              "Cancel"
            ) : (
              <Typography display="flex" alignItems="center" component="div">
                <ArrowBackIcon />
                Back
              </Typography>
            )}
          </FooterButton>
          {activeStep.creation <= steps.creation.length - 1 && (
            <FooterButton
              width={134}
              variant="contained"
              onClick={handleNext}
              disabled={
                !!data.errors[activeStep.creation].find(
                  (error: ValidationError) => !!error.error
                )
              }
            >
              {activeStep.creation === steps.creation.length - 1
                ? "Confirm"
                : "Next"}
            </FooterButton>
          )}
        </StepperFooter>
      );
    } else {
      return (
        <StepperFooter mt={2}>
          <FooterButton
            variant="contained"
            disabled={activeStep.execution < steps.execution.length - 1}
            onClick={() => handleRedirect(ROUTES.App)}
          >
            Start using your wallet
          </FooterButton>
        </StepperFooter>
      );
    }
  };

  return (
    <Box display="flex" flexDirection="row">
      <Box
        p={5}
        sx={{
          background: isExecuting
            ? theme.palette.grey.A100
            : theme.palette.grey.A200,
        }}
        width={1 / 3}
      >
        {renderSteps()}
      </Box>
      <Box sx={{ background: theme.palette.grey.A100 }} width={2 / 3}>
        {renderContent()}
      </Box>
    </Box>
  );
}

export default BaseStepper;
