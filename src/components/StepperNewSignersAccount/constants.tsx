import {
  ExecutionStep,
  OwnersStep,
  ReviewStep,
  WalletCreationStep,
  withCard,
} from "./steps";

export const STEPS = {
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

      Component: withCard(OwnersStep, "Add owners and confirmations"),
    },
    {
      id: 2,
      name: "Review",

      Component: withCard(ReviewStep, "Review"),
    },
  ],
  execution: [
    {
      id: 0,
      name: "Validating transaction",
      Component: withCard(ExecutionStep, "Creating your XSIgners Account"),
    },
    {
      id: 1,
      name: "Processing transaction",
      Component: withCard(ExecutionStep, "Creating your XSIgners Account"),
    },
    {
      id: 2,
      name: "XSigner Accoun it’s ready!",
      Component: withCard(ExecutionStep, "Creating your XSIgners Account"),
    },
  ],
};
