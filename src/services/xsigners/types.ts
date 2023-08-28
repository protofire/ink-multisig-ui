export interface RawXsignerAccount {
  address: string;
  threshold: number;
  owners: Array<string>;
  salt: string;
}
