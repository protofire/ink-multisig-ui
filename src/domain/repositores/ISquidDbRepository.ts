export interface ExternalTransactionData {
  txHash: string;
  methodName: string;
  args: [string];
  creationTimestamp: Date;
  inUse: boolean;
}

export interface ISquidDbRepository {
  insertTxData(extTxData: ExternalTransactionData): Promise<number>;
}
