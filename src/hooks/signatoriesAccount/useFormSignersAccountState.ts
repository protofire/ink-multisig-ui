import { useState } from "react";
import { ArrayOneOrMore } from "useink/dist/core";

export type ValidationError = {
  error: boolean;
  message: string;
};

const adjectives = [
  "Amazing",
  "Humble",
  "Graceful",
  "Daring",
  "Unique",
  "Mysterious",
  "Elegant",
  "Charming",
  "Vivid",
  "Bold",
];

const nouns = [
  "Journey",
  "Sunset",
  "Galaxy",
  "Ocean",
  "Mountain",
  "Forest",
  "Desert",
  "River",
  "Sky",
  "Island.",
];

let counter = 0;

const generateRandomWalletName = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const uniqueNumber = counter++;

  return `${adjective}-${noun}-${uniqueNumber}-wallet`;
};

export const useFormSignersAccountState = () => {
  const [walletName, setWalletName] = useState(generateRandomWalletName());
  const [owners, setOwners] = useState<ArrayOneOrMore<string>>([""]);
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

  const handleOwners = (newOwners: ArrayOneOrMore<string>, step: number) => {
    setOwners(newOwners);
  };

  const handleThreshold = (newThreshold: number, step: number) => {
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
  };
};
