import React from "react";

import { useForm } from "@/hooks/useForm";
import { useParseMetadataField } from "@/hooks/useParseMetadataField";

import { useManagerActiveStep } from "../StepperSignersAccount/useManagerActiveStep";
import { BaseStepper, StepType } from "./BaseStepper";
import { ImportContractStep } from "./ImportContractStep";
import { MethodSelectorStep } from "./MethodSelectorStep";
import { TxBuilderContext, TxBuilderForm } from "./TxBuilderContext";

const transformSteps = (
  steps: Array<
    Omit<StepType, "Component"> & {
      Component: React.FC<unknown>;
    }
  >
): StepType[] => {
  return steps.map((step) => ({
    id: step.id,
    name: step.name,
    label: step.label,
    Component: React.createElement(step.Component),
  }));
};

const steps = [
  {
    id: 0,
    name: "Import Contract",
    label: "Import a Contract to get the message to interact with it.",
    Component: ImportContractStep,
  },
  {
    id: 1,
    name: "Method Selector",
    label: "Set the transaction Information.",
    Component: MethodSelectorStep,
  },
];

export function TxBuilderStepper() {
  const managerStep = useManagerActiveStep();
  const metadataManager = useParseMetadataField();
  const inputFormManager = useForm<TxBuilderForm>({
    address: "",
    metadataSource: undefined,
  });

  const handleStepChange = (newStep: number) => {
    // Aquí puedes agregar lógica para cambiar de paso
    // Por ejemplo, basado en el estado de la transacción o validaciones
    console.log("__newStep", newStep);
  };

  const builderSteps = transformSteps(steps);

  return (
    <TxBuilderContext.Provider
      value={{
        metadataManager,
        inputFormManager,
      }}
    >
      <BaseStepper
        steps={builderSteps}
        managerStep={managerStep}
        onStepChange={handleStepChange}
        footerProps={{
          hiddenBack: managerStep.activeStep.creation === 0 ? true : false,
          nextButtonProps: {
            disabled: !metadataManager.metadata.isValid,
          },
        }}
      />
    </TxBuilderContext.Provider>
  );
}
