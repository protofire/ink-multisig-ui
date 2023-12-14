export interface MyQueryVariables {
  address: string | string[];
}

export interface MyQueryResponse {
  txes: TxType[];
}

export interface ITxQueueRepository {
  getQueue(address: string): Promise<TxType[] | null>;
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
  approvalCount: number;
  approvals: { approver: string; __typename: string }[];
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
  rejections: { rejected: string; __typename: string }[];
  selector: string;
  status: string;
  txId: string;
  value: string;
  __typename: string;
}

export type TxType = TransactionType & TransferType;

export type Order = {
  address: string;
  name: string;
  status: string;
};

export type ExtendedDataType = TxType & {
  state: string;
  token: string;
  img: string;
  type: string;
  to: string;
  txMsg: string;
  txStateMsg: string;
  stepperData: Order[] | undefined;
};
