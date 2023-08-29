import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrayOneOrMore } from "useink/dist/core";

import { CREATION_STEPS } from "@/components/StepperSignersAccount/constants";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Owner } from "@/domain/SignatoriesAccount";
import { SetState } from "@/domain/utilityReactTypes";
import { generateRandomWalletName, isValidAddress } from "@/utils/blockchain";

export type ValidationError = {
  error: boolean;
  message: string;
};

export interface UseFormSignersAccountStateReturn {
  walletName: string;
  address: string | undefined;
  owners: ArrayOneOrMore<Owner>;
  threshold: number;
  handleWalletName: (name: string, step: number, field?: number) => void;
  handleAddress: (
    newAddress: string | undefined,
    step: number,
    field?: number
  ) => void;
  handleOwners: (newOwners: ArrayOneOrMore<Owner>, step: number) => void;
  handleThreshold: (newThreshold: number) => void;
  errors: Array<Array<ValidationError>>;
  setErrors: SetState<Array<Array<ValidationError>>>;
}

export const INVALID_ADDRESS_ERROR =
  "Owner address must be a valid Polkadot address.";
export const INVALID_OWNER_NAME_ERROR =
  "Owner name must be less than 50 chars.";
export const INVALID_WALLET_NAME_ERROR =
  "Wallet name must exist and be less than 50 chars.";
export const DUPLICATE_ADDRESS_ERROR = "Duplicate owner address detected.";

const VALIDATIONS = {
  walletName: (name: string) => name && name.length <= 50,
  ownerName: (name: string) => name && name.length <= 50,
  ownerAddress: isValidAddress,
  threshold: (threshold: number, owners: number) =>
    threshold >= 1 && threshold <= owners,
};

export const useFormSignersAccountState = () => {
  const [walletName, setWalletName] = useState(generateRandomWalletName());
  const [address, setAddress] = useState<string | undefined>();
  const { accountConnected } = usePolkadotContext();
  const [owners, setOwners] = useState<ArrayOneOrMore<Owner>>([
    { name: "Signer 1", address: accountConnected?.address ?? "" },
  ]);
  const [threshold, setThreshold] = useState(1);
  const initialErrors = useMemo(
    () => Array.from({ length: CREATION_STEPS.creation.length }, () => []),
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
  const handleWalletName = useCallback(
    (name: string, step: number, field = 0) => {
      const error = VALIDATIONS.walletName(name)
        ? { error: false, message: "" }
        : {
            error: true,
            message: INVALID_WALLET_NAME_ERROR,
          };

      if (JSON.stringify(errors[step][field]) !== JSON.stringify(error)) {
        const newErrors = [...errors];
        newErrors[step][field] = error;
        setErrors(newErrors);
      }

      setWalletName(name);
    },
    [errors]
  );

  const handleOwners = useCallback(
    (newOwners: ArrayOneOrMore<Owner>, step: number) => {
      let updateRequired = false; // A flag to check if an update is really needed

      const newErrors = [...errors];
      const seenAddresses = new Set<string>();

      newOwners.forEach((owner, index) => {
        let errorMessage = "";

        // Check for duplicated addresses
        if (seenAddresses.has(owner.address)) {
          errorMessage = DUPLICATE_ADDRESS_ERROR;
        } else {
          seenAddresses.add(owner.address);
        }

        // Continue with other validations if no duplicate error
        if (!errorMessage) {
          if (!VALIDATIONS.ownerAddress(owner.address)) {
            errorMessage = INVALID_ADDRESS_ERROR;
          }

          if (!VALIDATIONS.ownerName(owner.name)) {
            errorMessage = INVALID_OWNER_NAME_ERROR;
          }
        }

        const error = {
          error: !!errorMessage,
          message: errorMessage,
        };

        // Check if the current error is different from the new one
        if (JSON.stringify(newErrors[step][index]) !== JSON.stringify(error)) {
          newErrors[step][index] = error;
          updateRequired = true;
        }
      });

      if (updateRequired) {
        setErrors(newErrors);
      }

      setOwners(newOwners);
    },
    [errors]
  );

  const handleThreshold = useCallback(
    (newThreshold: number) => {
      if (VALIDATIONS.threshold(newThreshold, owners.length)) {
        setThreshold(newThreshold);
      }
    },
    [owners.length]
  );

  const handleAddress = useCallback(
    (newAddress: string | undefined, step: number, field = 0) => {
      const error = !VALIDATIONS.ownerAddress(newAddress);
      const currentError = errors[step][field];
      const newError = {
        error,
        message: error ? INVALID_ADDRESS_ERROR : "",
      };

      // Only set errors if there's a genuine change
      if (JSON.stringify(currentError) !== JSON.stringify(newError)) {
        const newErrors = [...errors];
        newErrors[step][field] = newError;
        setErrors(newErrors);
      }

      setAddress(newAddress);
    },
    [errors]
  );

  return {
    walletName,
    address,
    owners,
    threshold,
    handleWalletName,
    handleAddress,
    handleOwners,
    handleThreshold,
    errors,
    setErrors,
  };
};
