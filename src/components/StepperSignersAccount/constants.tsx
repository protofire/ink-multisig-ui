import { withCard } from "./steps";
import {
  ExecutionStep as CreationExecutionStep,
  OwnersStep as CreationOwnerStep,
  ReviewStep as CreationReviewStep,
  WalletCreationStep,
} from "./steps/creation";
import {
  OwnersStep as LoadOwnersStep,
  ReviewStep as LoadReviewStep,
  WalletImportStep,
} from "./steps/load";

export type StepProps = {
  creation: Array<{
    id: number;
    name: string;
    Component: React.FC<any>;
  }>;
  execution: Array<{ id: number; name: string; Component: React.FC<any> }>;
};
export const DEFAULT_STEPS: StepProps = {
  creation: [
    {
      id: 0,
      name: "Select a name",

      Component: withCard(
        WalletCreationStep,
        "Select a name for your XSigners Account"
      ),
    },
    {
      id: 1,
      name: "Owners and confirmations",

      Component: withCard(CreationOwnerStep, "Add owners and confirmations"),
    },
    {
      id: 2,
      name: "Review",

      Component: withCard(CreationReviewStep, "Review"),
    },
  ],
  execution: [
    {
      id: 0,
      name: "Validating transaction",
      Component: withCard(
        CreationExecutionStep,
        "Creating your XSIgners Account"
      ),
    },
    {
      id: 1,
      name: "Processing transaction",
      Component: withCard(
        CreationExecutionStep,
        "Creating your XSIgners Account"
      ),
    },
    {
      id: 2,
      name: "XSigner Account is ready!",
      Component: withCard(
        CreationExecutionStep,
        "Creating your XSIgners Account"
      ),
    },
  ],
};

export const LOAD_STEPS: StepProps = {
  creation: [
    {
      id: 0,
      name: "Select a name",

      Component: withCard(
        WalletImportStep,
        "Select a name for your XSigners Account"
      ),
    },
    {
      id: 1,
      name: "Owners and confirmations",

      Component: withCard(LoadOwnersStep, "Add owners and confirmations"),
    },
    {
      id: 2,
      name: "Review",

      Component: withCard(LoadReviewStep, "Review"),
    },
  ],
  execution: [],
};
