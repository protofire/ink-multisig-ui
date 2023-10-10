import React from "react";

import { ReviewTokens } from "./Review";
import { SendTokens } from "./SendTokens";

export const ACTIONS = {
  SEND_TOKENS: "send tokens",
  REVIEW_TOKENS: "review tokens",
} as const;

type Steps = {
  type: string;
  Component: React.FC<any>;
}[];

export const steps: Steps = [
  {
    type: ACTIONS.SEND_TOKENS,
    Component: SendTokens,
  },
  {
    type: ACTIONS.REVIEW_TOKENS,
    Component: ReviewTokens,
  },
];

export { SendTokens };
