import { SignatoriesAccount } from "../SignatoriesAccount";

export interface IXsignerSelectedRepository {
  getAccount(): SignatoriesAccount | null;
  saveAccount(account: SignatoriesAccount): void;
}
