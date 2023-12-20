export interface ExternalTransactionData {
  txHash: string;
  methodName: string;
  args: ContractParam[];
  creationTimestamp: Date;
  inUse: boolean;
}

export interface ContractParam {
  name: string;
  value: string;
}

export interface ISquidDbRepository {
  insertTxData(extTxData: ExternalTransactionData): Promise<string>;
}
