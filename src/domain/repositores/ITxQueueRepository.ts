import { FullTxProposed } from "../TransactionProposed";
import { RawTxType } from "./ITxHistoryRepository";
import { RawExternalTransactionData } from "./IXsignerOwnersRepository";

export interface MyQueryVariables {
  address: string | string[];
}

export interface MyQueryResponse {
  transactions: RawTxType[];
}

export interface ITxQueueRepository {
  getQueue(address: string): Promise<FullTxProposed[] | null>;
}
export interface RawTransactionProposed {
  approvalCount: number;
  approvals: { approver: string; approvalTimestamp: string }[];
  args: string;
  contractAddress: string;
  creationBlockNumber: number;
  creationTimestamp: Date;
  error?: string;
  executionTxHash?: string;
  externalTransactionData: RawExternalTransactionData | null;
  id: string;
  lastUpdatedBlockNumber: number;
  lastUpdatedTimestamp: string;
  proposalTxHash: string;
  proposer: string;
  rejectionCount: number;
  rejections: { rejector: string; rejectionTimestamp: string }[];
  selector: string;
  status: string;
  txId: string;
  value: string;
  __typename: string;
}

export type Order = {
  address: string;
  name: string;
  status: string;
};
