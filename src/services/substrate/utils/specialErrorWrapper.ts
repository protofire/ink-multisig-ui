export const SPECIAL_ERRORS = ["StorageDepositLimitExhausted"] as const;
export type SpecialErrors = (typeof SPECIAL_ERRORS)[number];

const mapSpecialErrors: Record<SpecialErrors, string> = {
  StorageDepositLimitExhausted:
    "StorageDepositLimitExhausted, if you have no balance in your xsigner account, the Dry-run simulation of the Transaction may work improperly",
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
