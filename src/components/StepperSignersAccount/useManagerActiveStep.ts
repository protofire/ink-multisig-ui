import { useCallback, useState } from "react";

export interface ManagerActiveStep {
  activeStep: {
    creation: number;
    execution: number;
  };
  upCreationStep: () => void;
  downCreationStep: () => void;
  upExecutionStep: () => void;
  downExecutionStep: () => void;
  resetSteps: () => void;
  stepsLength: number;
}

export function useManagerActiveStep(stepsLength = 0): ManagerActiveStep {
  const [activeStep, setActiveStep] = useState<{
    creation: number;
    execution: number;
  }>({ creation: 0, execution: 0 });

  const upCreationStep = useCallback(
    () =>
      setActiveStep((prevActiveStep) => ({
        ...prevActiveStep,
        creation: prevActiveStep.creation + 1,
      })),
    [setActiveStep]
  );
  const downCreationStep = useCallback(
    () =>
      setActiveStep((prevActiveStep) => ({
        ...prevActiveStep,
        creation: prevActiveStep.creation - 1,
      })),
    [setActiveStep]
  );
  const upExecutionStep = useCallback(
    () =>
      setActiveStep((prevActiveStep) => ({
        ...prevActiveStep,
        execution: prevActiveStep.execution + 1,
      })),
    [setActiveStep]
  );
  const downExecutionStep = useCallback(
    () =>
      setActiveStep((prevActiveStep) => ({
        ...prevActiveStep,
        execution: prevActiveStep.execution - 1,
      })),
    [setActiveStep]
  );

  const resetSteps = useCallback(() => {
    setActiveStep({ creation: 0, execution: 0 });
  }, [setActiveStep]);

  return {
    activeStep,
    upCreationStep,
    downCreationStep,
    upExecutionStep,
    downExecutionStep,
    resetSteps,
    stepsLength,
  };
}
