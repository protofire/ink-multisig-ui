import { Owner } from "./SignatoriesAccount";
import { TransactionProposed } from "./TransactionProposed";

export interface OwnerWithAction extends Owner {
  actionTimestamp: Date | null;
  status: "Pending" | "Approved" | "Rejected";
}

export type TransactionDisplayInfo = {
  type:
    | "Receive"
    | "Send Native"
    | "Send PSP22"
    | "Settings"
    | "Custom Contract"
    | undefined;
  img: string;
  txMsg: "from" | "to" | undefined;
  valueAmount: string;
  to: string | undefined;
  from: string | undefined;
};

export interface TransactionProposedItemUi
  extends TransactionProposed,
    TransactionDisplayInfo {
  ownersAction: OwnerWithAction[];
}

export const emptyDisplayInfo: TransactionDisplayInfo = {
  img: "",
  type: undefined,
  txMsg: undefined,
  valueAmount: "",
  to: undefined,
  from: undefined,
};

export function isXsignerOrCustomContract(
  type: TransactionDisplayInfo["type"]
): boolean {
  return type === "Settings" || type === "Custom Contract";
}
