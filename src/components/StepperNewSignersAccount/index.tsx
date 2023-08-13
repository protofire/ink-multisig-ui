import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Step, Stepper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChainId } from "useink/dist/chains";

import { ROUTES } from "@/config/routes";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import {
  useFormSignersAccountState,
  ValidationError,
} from "@/hooks/signatoriesAccount/useFormSignersAccountState";

import { STEPS } from "./constants";
import { FooterButton, StepperFooter, StyledStepLabel } from "./styled";

type SaveProps = Omit<SignatoriesAccount, "address">;

type StepperNewSignersAccountProps = {
  save: (props: SaveProps) => void;
  onComplete: () => void;
  isExecuting: boolean;
  networkId: ChainId;
};

function StepperNewSignersAccount({
  save,
  isExecuting,
  networkId,
  onComplete,
}: StepperNewSignersAccountProps) {
  const [activeStep, setActiveStep] = useState<{
    creation: number;
    execution: number;
  }>({ creation: 0, execution: 0 });
  const data = useFormSignersAccountState();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (!isExecuting) return;

    let executionInterval: NodeJS.Timeout;

    //TODO: Add logic to handle execution steps. This is just a mock.
    const handleExecution = () => {
      executionInterval = setInterval(() => {
        if (activeStep.execution === STEPS.execution.length - 1) {
          clearInterval(executionInterval);
          onComplete();
          return;
        }
        setActiveStep((prevActiveStep) => ({
          ...prevActiveStep,
          execution: prevActiveStep.execution + 1,
        }));
      }, 2000);
    };

    handleExecution();

    return () => {
      clearInterval(executionInterval);
    };
  }, [isExecuting, activeStep, setActiveStep, onComplete]);

  const handleNext = () => {
    const isLastStep = activeStep.creation === STEPS.creation.length - 1;
    if (isLastStep) {
      const parsedData: SaveProps = {
        owners: data.owners,
        threshold: data.threshold,
        name: data.walletName,
        networkId,
      };
      save(parsedData);
    } else {
      setActiveStep((prevActiveStep) => ({
        ...prevActiveStep,
        creation: prevActiveStep.creation + 1,
      }));
    }
  };

  const handleRedirect = () => {
    console.log("Redirect to signers account");
  };

  const handleBack = () => {
    const isFirstStep = activeStep.creation === 0;
    if (isFirstStep) {
      router.replace(ROUTES.New);
    } else {
      setActiveStep((prevActiveStep) => ({
        ...prevActiveStep,
        creation: prevActiveStep.creation - 1,
      }));
    }
  };

  const section = isExecuting ? "execution" : "creation";
  const activeSubStep = isExecuting
    ? activeStep.execution
    : activeStep.creation;

  const renderSteps = () => (
    <Stepper activeStep={activeSubStep} orientation="vertical">
      {STEPS[section].map((step) => (
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
    const { Component } = STEPS[section][activeSubStep];
    return <Component {...data} footer={renderFooter()} step={activeSubStep} />;
  };

  const renderFooter = () => {
    if (!isExecuting) {
      return (
        <StepperFooter mt={4}>
          <FooterButton width={134} variant="outlined" onClick={handleBack}>
            {activeStep.creation === STEPS.creation.length - 1 ||
            activeStep.creation === 0 ? (
              "Cancel"
            ) : (
              <Typography display="flex" alignItems="center" component="div">
                <ArrowBackIcon />
                Back
              </Typography>
            )}
          </FooterButton>
          {activeStep.creation <= STEPS.creation.length - 1 && (
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
              {activeStep.creation === STEPS.creation.length - 1
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
            disabled={activeStep.execution < STEPS.execution.length - 1}
            onClick={handleRedirect}
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

export default StepperNewSignersAccount;
