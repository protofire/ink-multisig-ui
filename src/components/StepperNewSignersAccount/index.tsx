import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Step, Stepper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useContract, useEvents, useEventSubscription, useTx } from "useink";
import { ChainId } from "useink/dist/chains";
import { MultisigFactorySdk } from "xsigners-sdk-test";

import { ROUTES } from "@/config/routes";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import {
  useFormSignersAccountState,
  ValidationError,
} from "@/hooks/xsignersAccount/useFormSignersAccountState";
import { generateHash } from "@/utils/blockchain";

import { STEPS } from "./constants";
import { FooterButton, StepperFooter, StyledStepLabel } from "./styled";

export type SaveProps = Omit<SignatoriesAccount, "address">;

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
  const hasSavedRef = useRef(false);

  const metadata = MultisigFactorySdk.contractMetadata("shibuya-testnet");
  const multisigFactoryContract = useContract(
    metadata?.addressChain,
    JSON.parse(metadata?.ContractAbi),
    "shibuya-testnet"
  );
  const newMultisigTx = useTx(multisigFactoryContract, "newMultisig");
  useEventSubscription(multisigFactoryContract);
  const { events: multisigFactoryEvents } = useEvents(
    multisigFactoryContract?.contract.address,
    ["NewMultisig"]
  );

  useEffect(() => {
    if (!isExecuting || hasSavedRef.current) return;
    const handleExecution = async () => {
      if (activeStep.execution === STEPS.execution.length - 1) {
        if (hasSavedRef.current) return; // Return if already saved
        const parsedData: SaveProps = {
          owners: data.owners,
          threshold: data.threshold,
          name: data.walletName,
          networkId,
        };

        const date = new Date();
        const salt = generateHash(date.toString());
        const owners = parsedData.owners.map((o) => o.address);

        // Here we create the Tx and then send it to the wallet to be signed.
        // We DO NOT wait for the wallet to sign it, we just send it.
        newMultisigTx.signAndSend([parsedData.threshold, owners, salt]);
        hasSavedRef.current = true;
        return;
      }
      // setActiveStep((prevActiveStep) => ({
      //   ...prevActiveStep,
      //   execution: prevActiveStep.execution + 1,
      // }));
    };

    handleExecution();
  }, [
    isExecuting,
    activeStep.execution,
    setActiveStep,
    onComplete,
    save,
    data.owners,
    data.threshold,
    data.walletName,
    networkId,
  ]);

  useEffect(() => {
    if (!multisigFactoryEvents || multisigFactoryEvents.length === 0) return;
    console.log("multisigFactoryEvents", multisigFactoryEvents);
    setActiveStep((prevActiveStep) => ({
      ...prevActiveStep,
      execution: prevActiveStep.execution + 1,
    }));
  }, [multisigFactoryEvents]);

  const handleNext = () => {
    const isLastStep = activeStep.creation === STEPS.creation.length - 1;
    if (isLastStep) {
      onComplete();
      return;
    } else {
      setActiveStep((prevActiveStep) => ({
        ...prevActiveStep,
        creation: prevActiveStep.creation + 1,
      }));
    }
  };

  const handleRedirect = () => {
    router.replace(ROUTES.App);
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
      <Box>
        <h2>Status: {newMultisigTx?.status}</h2>
      </Box>
    </Box>
  );
}

export default StepperNewSignersAccount;
