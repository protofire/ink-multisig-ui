import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import BaseStepper, {
  BaseStepperProps,
} from "@/components/StepperSignersAccount/BaseStepper";
import {
  CREATION_STEPS,
  LOAD_STEPS,
} from "@/components/StepperSignersAccount/constants";
import { useManagerActiveStep } from "@/components/StepperSignersAccount/useManagerActiveStep";
import { useFormSignersAccountState } from "@/hooks/xsignersAccount/useFormSignersAccountState";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/StepperXsignerAccount",
  component: BaseStepper,
} satisfies Meta<typeof BaseStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const WrapperNewAccount = (args: BaseStepperProps) => {
  const data = useFormSignersAccountState();
  const managerStep = useManagerActiveStep();
  const [isExecution, setIsExecution] = useState(false);

  const _props = {
    ...args,
    isExecution,
    onCompleteCreation: () => setIsExecution(true),
    data: data,
    managerStep: managerStep,
  };

  return <BaseStepper {..._props} />;
};

export const NewAccount: Story = {
  render: WrapperNewAccount,
  args: {
    steps: CREATION_STEPS,
  } as BaseStepperProps,
};

export const LoadAccount: Story = {
  render: WrapperNewAccount,
  args: {
    isExecuting: false,
    steps: LOAD_STEPS,
  } as BaseStepperProps,
};
