import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Step, Stepper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ChainId } from "useink/dist/chains";

import { ROUTES } from "@/config/routes";
import {
  useFormSignersAccountState,
  ValidationError,
} from "@/hooks/xsignersAccount/useFormSignersAccountState";
import { TransactionStatus } from "@/services/useink/types";

import { SaveProps } from ".";
import { DEFAULT_STEPS, StepProps } from "./constants";
import { FooterButton, StepperFooter, StyledStepLabel } from "./styled";

export type StepperNewSignersAccountProps = {
  save: (props: SaveProps) => void;
  onComplete?: () => void;
  isExecuting: boolean;
  networkId: ChainId;
  steps?: StepProps;
  txStatus: TransactionStatus;
};

function CreateNewAccount({
  save,
  isExecuting,
  networkId,
  onComplete,
  steps = DEFAULT_STEPS,
  txStatus,
}: StepperNewSignersAccountProps) {
  const [activeStep, setActiveStep] = useState<{
    creation: number;
    execution: number;
  }>({ creation: 0, execution: 0 });
  const data = useFormSignersAccountState();
  const router = useRouter();
  const theme = useTheme();
  const hasBeenCalled = useRef(false);

  useEffect(() => {
    if (!isExecuting || hasBeenCalled.current) return;

    save({
      owners: data.owners,
      threshold: data.threshold,
      name: data.walletName,
      networkId,
    });
    hasBeenCalled.current = true;
  }, [data, isExecuting, networkId, save]);

  useEffect(() => {
    if (txStatus === "PendingSignature" && activeStep.execution === 0) {
      setActiveStep((prevActiveStep) => ({
        ...prevActiveStep,
        execution: prevActiveStep.execution + 1,
      }));
    }
    if (
      (txStatus === "InBlock" || txStatus === "Finalized") &&
      activeStep.execution === 1
    ) {
      setActiveStep((prevActiveStep) => ({
        ...prevActiveStep,
        execution: prevActiveStep.execution + 1,
      }));
    }
  }, [activeStep.execution, txStatus]);

  const handleNext = () => {
    const isLastStep = activeStep.creation === steps.creation.length - 1;
    if (isLastStep) {
      onComplete?.();
      if (!steps.execution.length) {
        handleRedirect(ROUTES.App);
      }
      return;
    } else {
      setActiveStep((prevActiveStep) => ({
        ...prevActiveStep,
        creation: prevActiveStep.creation + 1,
      }));
    }
  };

  const handleRedirect = (route: string) => {
    router.replace(route);
  };

  const handleBack = () => {
    const isFirstStep = activeStep.creation === 0;
    if (isFirstStep) {
      handleRedirect(ROUTES.Welcome);
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

export default CreateNewAccount;
