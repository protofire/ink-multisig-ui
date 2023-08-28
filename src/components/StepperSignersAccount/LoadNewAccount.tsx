import BaseStepper from "@/components/StepperSignersAccount/BaseStepper";
import { useFormSignersAccountState } from "@/hooks/xsignersAccount/useFormSignersAccountState";

import { useManagerActiveStep } from "../StepperSignersAccount/useManagerActiveStep";
import { LOAD_STEPS } from "./constants";

// interface LoadNewAccountProps {}

export function LoadNewAccount() {
  const data = useFormSignersAccountState();
  const managerStep = useManagerActiveStep();

  return (
    <>
      <BaseStepper
        isExecuting={false}
        steps={LOAD_STEPS}
        data={data}
        managerStep={managerStep}
      />
    </>
  );
}

export default LoadNewAccount;
