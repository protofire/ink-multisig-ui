import { useEffect, useRef, useState } from "react";

import ErrorMessage from "@/components/common/ErrorMessage";
import BaseStepper from "@/components/StepperSignersAccount/BaseStepper";
import { CREATION_STEPS } from "@/components/StepperSignersAccount/constants";
import {
  useAddSignersAccount,
  useNewSignersAccount,
} from "@/hooks/xsignersAccount";
import { useFormSignersAccountState } from "@/hooks/xsignersAccount/useFormSignersAccountState";
import { ChainId } from "@/services/useink/types";

import { useManagerActiveStep } from "../StepperSignersAccount/useManagerActiveStep";

interface CreateNewAccountProps {
  networkId: ChainId;
}

export function CreateNewAccount({ networkId }: CreateNewAccountProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const data = useFormSignersAccountState();
  const { save } = useAddSignersAccount();
  const { signAndSend, txStatus, error, reset } = useNewSignersAccount(save);
  const managerStep = useManagerActiveStep();
  const { activeStep, upExecutionStep, resetSteps } = managerStep;
  const hasBeenCalled = useRef(false);

  useEffect(() => {
    if (!isExecuting || hasBeenCalled.current) return;
    signAndSend({
      owners: data.owners,
      threshold: data.threshold,
      name: data.walletName,
      networkId,
    });
    hasBeenCalled.current = true;
  }, [data, isExecuting, networkId, signAndSend]);

  useEffect(() => {
    if (txStatus === "PendingSignature" && activeStep.execution === 0) {
      upExecutionStep();
    }
    if (
      (txStatus === "InBlock" || txStatus === "Finalized") &&
      activeStep.execution === 1
    ) {
      upExecutionStep();
    }
  }, [activeStep.execution, txStatus, upExecutionStep]);

  useEffect(() => {
    if (error && activeStep.execution === 1) {
      const errors = [...data.errors];
      errors[activeStep.execution][0] = { error: true, message: error };
      data.setErrors(errors);
    } else {
      if (error) {
        setIsExecuting(false);
        hasBeenCalled.current = false;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep.execution, error]);

  const handleReset = () => {
    data.setErrors(
      Array.from({ length: CREATION_STEPS.creation.length }, () => [])
    );
    reset();
    resetSteps();
    setIsExecuting(false);
    hasBeenCalled.current = false;
  };

  return (
    <>
      {error && hasBeenCalled.current && <ErrorMessage message={error} />}
      <BaseStepper
        isExecuting={isExecuting}
        onCompleteCreation={() => setIsExecuting(true)}
        steps={CREATION_STEPS}
        data={data}
        reset={handleReset}
        managerStep={managerStep}
      />
    </>
  );
}

export default CreateNewAccount;
