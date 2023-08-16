import { useEffect, useMemo, useState } from "react";
import { ArrayOneOrMore } from "useink/dist/core";

import { STEPS } from "@/components/StepperNewSignersAccount/constants";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Owner } from "@/domain/SignatoriesAccount";
import { generateRandomWalletName, isValidAddress } from "@/utils/blockchain";

export type ValidationError = {
  error: boolean;
  message: string;
};

const INVALID_ADDRESS_ERROR = "Owner address must be a valid Polkadot address.";
const INVALID_OWNER_NAME_ERROR = "Owner name must be less than 50 chars.";
const INVALID_WALLET_NAME_ERROR =
  "Wallet name must exist and be less than 50 chars.";

const VALIDATIONS = {
  walletName: (name: string) => name && name.length <= 50,
  ownerName: (name: string) => name && name.length <= 50,
  ownerAddress: isValidAddress,
  threshold: (threshold: number, owners: number) =>
    threshold >= 1 && threshold <= owners,
};

export const useFormSignersAccountState = () => {
  const [walletName, setWalletName] = useState(generateRandomWalletName());
  const { accountConnected } = usePolkadotContext();
  const [owners, setOwners] = useState<ArrayOneOrMore<Owner>>([
    { name: "Signer 1", address: accountConnected?.address ?? "" },
  ]);
  const [threshold, setThreshold] = useState(1);
  const initialErrors = useMemo(
    () => Array.from({ length: STEPS.creation.length }, () => []),
    []
  );
  const [errors, setErrors] =
    useState<Array<Array<ValidationError>>>(initialErrors);

  useEffect(() => {
    if (!VALIDATIONS.ownerAddress(accountConnected?.address ?? "")) {
      setErrors((prev) => {
        const newErrors = [...prev];
        newErrors[1][0] = {
          error: true,
          message: INVALID_ADDRESS_ERROR,
        };
        return newErrors;
      });
    }
  }, [accountConnected]);

  // Handlers for each field
  const handleWalletName = (name: string, step: number) => {
    const error = VALIDATIONS.walletName(name)
      ? { error: false, message: "" }
      : {
          error: true,
          message: INVALID_WALLET_NAME_ERROR,
        };

    const newErrors = [...errors];
    newErrors[step][0] = error;
    setErrors(newErrors);
    setWalletName(name);
  };

  const handleOwners = (newOwners: ArrayOneOrMore<Owner>, step: number) => {
    newOwners.forEach((owner, index) => {
      let errorMessage = "";

      if (!VALIDATIONS.ownerAddress(owner.address)) {
        errorMessage = INVALID_ADDRESS_ERROR;
      }

      if (!VALIDATIONS.ownerName(owner.name)) {
        errorMessage = INVALID_OWNER_NAME_ERROR;
      }

      const error = {
        error: !!errorMessage,
        message: errorMessage,
      };

      const newErrors = [...errors];
      newErrors[step][index] = error;
      setErrors(newErrors);
    });

    setOwners(newOwners);
  };

  const handleThreshold = (newThreshold: number) => {
    if (VALIDATIONS.threshold(newThreshold, owners.length)) {
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
    errors,
    setErrors,
  };
};
