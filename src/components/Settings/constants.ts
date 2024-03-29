import { StepProps } from "../StepperSignersAccount/constants";
import { withCard } from "../StepperSignersAccount/steps";
import OwnerStep from "./steps/OwnerStep";
import ReviewStep from "./steps/ReviewStep";
import ThresholdStep from "./steps/ThresholdStep";

export const OWNER_STEPS: StepProps = {
  creation: [
    {
      id: 0,
      name: "Create",

      Component: withCard(OwnerStep, "Add owner"),
    },
    {
      id: 1,
      name: "Confirm",

      Component: withCard(ReviewStep, "Review transaction"),
    },
  ],
  execution: [],
};

export const THRESHOLD_STEPS: StepProps = {
  creation: [
    {
      id: 0,
      name: "Create",

      Component: withCard(ThresholdStep, "Change threshold"),
    },
    {
      id: 1,
      name: "Confirm",

      Component: withCard(ReviewStep, "Review transaction"),
    },
  ],
  execution: [],
};
