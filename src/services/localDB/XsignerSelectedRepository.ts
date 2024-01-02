import { IXsignerSelectedRepository } from "@/domain/repositores/IXsignerSelectedRepository";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

export class XsignerSelectedRepository implements IXsignerSelectedRepository {
  private readonly storageKey = "signatoriesAccount";

  getAccount(): SignatoriesAccount["address"] | null {
    return getLocalStorageState(this.storageKey, null);
  }

  saveAccount(account: SignatoriesAccount["address"]): void {
    setLocalStorageState(this.storageKey, account);
  }
}
