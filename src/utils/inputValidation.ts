import { isValidAddress } from "./blockchain";

export const onlyAddress = (address: string | undefined) => {
  if (!isValidAddress(address)) return "Enter a valid address.";
};
