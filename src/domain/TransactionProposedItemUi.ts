import { Owner } from "./SignatoriesAccount";
import { TransactionProposed } from "./TransactionProposed";

export interface OwnerWithAction extends Owner {
  actionTimestamp: Date | null;
  status: "Pending" | "Approved" | "Rejected";
}

type CustomTx = string;

export type TransactionDisplayInfo = {
  type: "Receive" | "Send" | CustomTx | undefined;
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
