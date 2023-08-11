import { useState } from "react";
import { ArrayOneOrMore } from "useink/dist/core";

import { STEPS } from "@/components/StepperNewSignersAccount/constants";
import { Owner } from "@/domain/SignatoriesAccount";
import { generateRandomWalletName, isValidAddress } from "@/utils/blockchain";

export type ValidationError = {
  error: boolean;
  message: string;
};

export const useFormSignersAccountState = () => {
  const [walletName, setWalletName] = useState(generateRandomWalletName());
  const [owners, setOwners] = useState<ArrayOneOrMore<Owner>>([
    { name: "Owner 1", address: "" },
  ]);
  const [threshold, setThreshold] = useState(1);
  const [errors, setErrors] = useState<Array<Array<ValidationError>>>(
    Array.from({ length: STEPS.creation.length }, () => [])
  );

  // Validation logic
  const validateWalletName = (name: string, step: number): ValidationError => {
    let err = { error: false, message: "" };
    if (name && name.length <= 50) {
      err = { error: false, message: "" };
    } else {
      err = {
        error: true,
        message: "Wallet name must exist and to be less than 50 chars",
      };
    }
    // Modify only the error for the current step
    const newErrors = [...errors];
    newErrors[step][0] = err;
    setErrors(newErrors);

    return err;
  };

  const validateOwnerName = (name: string): boolean => {
    if (name && name.length <= 50) {
      return true;
    }
    return false;
  };

  const validateOwnerAddress = (address: string): boolean => {
    return isValidAddress(address);
  };

  const validateThreshold = (threshold: number, owners: number): boolean => {
    if (threshold >= 1 && threshold <= owners) {
      return true;
    }
    return false;
  };

  // Handlers for each field
  const handleWalletName = (name: string, step: number) => {
    validateWalletName(name, step);
    setWalletName(name);
  };

  const handleOwners = (newOwners: ArrayOneOrMore<Owner>, step: number) => {
    newOwners.forEach((owner, index) => {
      const err = { error: false, message: "" };
      if (!validateOwnerName(owner.name)) {
        err.error = true;
        err.message = "Owner name must be less than 50 chars";
      }

      if (!validateOwnerAddress(owner.address)) {
        err.error = true;
        err.message = "Owner address must be a valid Polkadot address";
      }

      const newErrors = [...errors];
      // Modify only the error for the current step
      newErrors[step][index] = err;
      setErrors(newErrors);

      return err;
    });

    setOwners(newOwners);
  };

  const handleThreshold = (newThreshold: number) => {
    if (validateThreshold(newThreshold, owners?.length ?? 0)) {
      setThreshold(newThreshold);
    }
  };

  return {
    walletName,
    owners,
    threshold,
    handleWalletName,
    handleOwners,
    handleThreshold,
    validateWalletName,
    validateOwnerName,
    validateOwnerAddress,
    validateThreshold,
    errors,
    setErrors,
  };
};
