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
  const { signAndSend, txStatus, error } = useNewSignersAccount(save);
  const managerStep = useManagerActiveStep();
  const { activeStep, upExecutionStep } = managerStep;
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

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <BaseStepper
        isExecuting={isExecuting}
        onCompleteCreation={() => setIsExecuting(true)}
        steps={CREATION_STEPS}
        data={data}
        managerStep={managerStep}
      />
    </>
  );
}

export default CreateNewAccount;
