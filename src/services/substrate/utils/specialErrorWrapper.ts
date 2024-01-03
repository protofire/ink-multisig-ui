export const SPECIAL_ERRORS = ["StorageDepositLimitExhausted"] as const;
export type SpecialErrors = (typeof SPECIAL_ERRORS)[number];

const mapSpecialErrors: Record<SpecialErrors, string> = {
  StorageDepositLimitExhausted:
    "Transaction might fail. Insufficient native balance in the multisig \
    xsigner account can lead to inaccurate transaction simulations. Please add funds to the multisig",
};

function isSpecialError(error: string): error is SpecialErrors {
  return SPECIAL_ERRORS.includes(error as SpecialErrors);
}

export function getIfSpecialError(substrateError: string) {
  if (isSpecialError(substrateError)) {
    return mapSpecialErrors[substrateError];
  }

  return substrateError;
}
