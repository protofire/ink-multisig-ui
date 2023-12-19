import { SignatoriesAccount } from "../SignatoriesAccount";

export interface MultisigData {
  id: string;
  addressHex: string;
  addressSS58: string;
  owners: string[];
  threshold: number;
}

export interface MyQueryVariables {
  address: string | string[];
}

export interface MyQueryResponse {
  multisigs: MultisigData[];
}

export interface RawExternalTransactionData {
  txHash: string;
  methodName: string;
  args: string;
  creationTimestamp: Date;
  inUse: boolean;
}

export interface IXsignerOwnersRepository {
  getMultisigByAddress(address: string): Promise<MultisigData | null>;
  getMultisigsByOwner(address: string): Promise<SignatoriesAccount[] | null>;
}
