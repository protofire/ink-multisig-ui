import { FullTxProposed } from "../TransactionProposed";
import { RawTransactionProposed } from "./ITxQueueRepository";

export interface MyQueryVariables {
  address: string | string[];
}

export interface MyQueryResponse {
  txes: RawTxType[];
}

export interface ITxHistoryRepository {
  getHistory(address: string): Promise<FullTxProposed[] | null>;
}

export interface RawTransferProposed {
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

export type RawTxType = RawTransactionProposed & RawTransferProposed;
