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
      name: "Select network and name of your ink",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
      Component: withCard(
        WalletCreationStep,
        "Select network and name of your ink"
      ),
    },
    {
      id: 1,
      name: "Add owners and set confirmations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
      Component: withCard(OwnersStep, "Add owners and set confirmations"),
    },
    {
      id: 2,
      name: "Review and confirm",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
      Component: withCard(ReviewStep, "Review and confirm"),
    },
  ],
  execution: [
    {
      id: 0,
      name: "Validation transaction",
      description: "",
      Component: ExecutionStep,
    },
    {
      id: 1,
      name: "Processing transaction",
      description: "",
      Component: ExecutionStep,
    },
    {
      id: 2,
      name: "Ink account is ready",
      description: "",
      Component: ExecutionStep,
    },
  ],
};
