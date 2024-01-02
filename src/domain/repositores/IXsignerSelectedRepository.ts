import { SignatoriesAccount } from "../SignatoriesAccount";

export interface IXsignerSelectedRepository {
  getAccount(): SignatoriesAccount["address"] | null;
  saveAccount(account: SignatoriesAccount["address"]): void;
}
