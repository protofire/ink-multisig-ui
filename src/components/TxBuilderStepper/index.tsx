import React from "react";

import { useForm } from "@/hooks/useForm";
import { useParseMetadataField } from "@/hooks/useParseMetadataField";

import { useManagerActiveStep } from "../StepperSignersAccount/useManagerActiveStep";
import { BaseStepper, StepType } from "./BaseStepper";
import { ImportContractStep } from "./ImportContractStep";
import { MethodSelectorStep } from "./MethodSelectorStep";
import { ProposeTxStep } from "./ProposeTxStep";
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
  {
    id: 2,
    name: "Propose transaction",
    label: "The previously established message will be proposed",
    Component: ProposeTxStep,
  },
];

export function TxBuilderStepper() {
  const managerStep = useManagerActiveStep(steps.length);
  const metadataManager = useParseMetadataField();
  const inputFormManager = useForm<TxBuilderForm>({
    address: "",
    metadataSource: undefined,
    selectedAbiIdentifier: undefined,
    selectedAbiMessage: undefined,
    dataArgs: undefined,
    transferTxStruct: undefined,
  });

  const builderSteps = transformSteps(steps);

  return (
    <TxBuilderContext.Provider
      value={{
        metadataManager,
        inputFormManager,
        managerStep,
      }}
    >
      <BaseStepper steps={builderSteps} managerStep={managerStep} />
    </TxBuilderContext.Provider>
  );
}
