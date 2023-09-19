export interface TxQueueData {
  id: string;
  addressHex: string;
  addressSS58: string;
  transactions: Tx[];
  owners: string[];
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
  value: number;
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
