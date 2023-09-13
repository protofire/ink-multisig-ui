export interface TxQueueData {
  id: string;
  addressHex: string;
  addressSS58: string;
  transactions: Tx[];
  threshold: number;
}

export interface Tx {
  selector: string;
  args: string;
  contractAddress: string;
  proposer: string;
  rejectionCount: number;
  approvalCount: number;
  status: string;
  lastUpdatedTimestamp: string;
}

export interface MyQueryVariables {
  address: string;
}

export interface MyQueryResponse {
  multisigs: TxQueueData[];
}

export interface ITxQueueRepository {
  getQueue(address: string): Promise<TxQueueData | null>;
}
