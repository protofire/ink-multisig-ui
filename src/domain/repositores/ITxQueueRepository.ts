import { RawExternalTransactionData } from "./IXsignerOwnersRepository";

export interface MyQueryVariables {
  address: string | string[];
}

export interface MyQueryResponse {
  transactions: TxType[];
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

export interface RawTransactionProposed {
  approvalCount: number;
  approvals: { approver: string; approvalTimestamp: string }[];
  args: string;
  contractAddress: string;
  creationBlockNumber: number;
  creationTimestamp: string;
  error?: string;
  executionTxHash?: string;
  externalTransactionData: RawExternalTransactionData | null;
  id: string;
  lastUpdatedBlockNumber: number;
  lastUpdatedTimestamp: string;
  proposalTxHash: string;
  proposer: string;
  rejectionCount: number;
  rejections: { rejected: string; rejectionTimestamp: string }[];
  selector: string;
  status: string;
  txId: string;
  value: string;
  __typename: string;
}

export type TxType = RawTransactionProposed & TransferType;

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
