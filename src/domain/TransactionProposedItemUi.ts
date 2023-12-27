import { Owner } from "./SignatoriesAccount";
import { TransactionProposed } from "./TransactionProposed";

export interface OwnerWithAction extends Owner {
  actionTimestamp: Date;
}

export type OwnersWithAction = {
  approvers: OwnerWithAction[];
  rejectors: OwnerWithAction[];
};

export type TransactionDisplayInfo = {
  type: "Receive" | "Send" | undefined;
  img: string;
  txMsg: "from" | "to" | undefined;
  valueAmount: string;
  to: string;
};

export interface TransactionProposedItemUi
  extends TransactionProposed,
    TransactionDisplayInfo {
  ownersAction: OwnersWithAction;
}

export const emptyDisplayInfo: TransactionDisplayInfo = {
  img: "",
  type: undefined,
  txMsg: undefined,
  valueAmount: "",
  to: "",
};
