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

export interface IXsignerOwnersRepository {
  getMultisigByAddress(address: string): Promise<MultisigData | null>;
  getMultisigsByOwner(address: string): Promise<MultisigData[] | null>;
}
