import { isValidAddress } from "./blockchain";

export const onlyAddress = (address: string | undefined) => {
  if (!isValidAddress(address)) return "Enter a valid address.";
};

export function notEmpty(value: unknown): string | void {
  if (typeof value === "string" && value.trim() === "")
    return "This field cannot be empty";

  if (value === "") return "This field cannot be empty";
}
