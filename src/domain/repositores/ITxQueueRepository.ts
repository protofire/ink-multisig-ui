// export interface TxQueueData {
//   id: string;
//   addressHex: string;
//   addressSS58: string;
//   transactions: Tx[];
//   owners: string[];
// }

// export interface Tx {
//   selector: string;
//   args: string;
//   contractAddress: string;
//   proposer: string;
//   rejectionCount: number;
//   approvalCount: number;
//   status: string;
//   lastUpdatedTimestamp: string;
//   value: number;
// }

export interface MyQueryVariables {
  address: string;
}

export interface MyQueryResponse {
  txes: TxQueueType[];
}

export interface ITxQueueRepository {
  getQueue(address: string): Promise<TxQueueType[] | null>;
}

export interface TransferType {
  creationBlockNumber: number;
  creationTimestamp: string;
  from: string;
  id: string;
  to: string;
  tokenAddress: string;
  tokenDecimals: string;
  transferType: string;
  value: string;
  __typename: string;
}

export interface TransactionType {
  approvalCount?: number;
  approvals?: { approver: string }[];
  args?: string;
  contractAddress: string;
  creationBlockNumber: number;
  creationTimestamp: string;
  error?: string;
  executionTxHash?: string;
  externalTransactionData?: string;
  id: string;
  lastUpdatedBlockNumber: number;
  lastUpdatedTimestamp: string;
  proposalTxHash: string;
  proposer: string;
  rejectionCount: number;
  rejections: unknown;
  selector: string;
  status: "PROPOSED";
  txId: string;
  value: string;
  __typename: string;
}

export type TxQueueType = TransactionType & TransferType;
