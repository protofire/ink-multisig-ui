import { useState } from "react";

type Owner = {
  name: string;
  address: string;
};

export type ValidationError = {
  error: boolean;
  message: string;
};

const generateRandomWalletName = (): string => {
  return `ink-wallet-${Math.floor(Math.random() * 1000)}`;
};

export const useFormSignersAccountState = () => {
  const [walletName, setWalletName] = useState(generateRandomWalletName());
  const [owners, setOwners] = useState<Owner[]>([]);
  const [threshold, setThreshold] = useState(0);
  const [errors, setErrors] = useState([{ error: false, message: "" }]);

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
    setErrors((prev) => {
      const newErrors = [...prev];
      newErrors[step] = err;
      return newErrors;
    });

    return err;
  };

  const validateOwnerName = (name: string, step: number): boolean => {
    if (name.length <= 50) {
      return true;
    }
    return false;
  };

  const validateOwnerAddress = (address: string, step: number): boolean => {
    const pattern = /^0x[a-fA-F0-9]{40}$/;
    if (pattern.test(address)) {
      return true;
    }
    return false;
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

  const handleOwners = (newOwners: Owner[], step: number) => {
    setOwners(newOwners);
  };

  const handleThreshold = (newThreshold: number, step: number) => {
    if (validateThreshold(newThreshold, owners.length)) {
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
  };
};
