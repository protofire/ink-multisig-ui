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
  type: "Receive" | "Send";
  img: string;
  txMsg: "from" | "to";
  valueAmount: string;
};

export interface TransactionProposedItemUi
  extends TransactionProposed,
    TransactionDisplayInfo {
  ownersAction: OwnersWithAction;
}
