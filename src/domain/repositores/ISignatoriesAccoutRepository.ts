import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { Chain } from "@/services/useink/types";

export interface ISignatoriesAccountRepository {
  addSignatoryAccount(account: SignatoriesAccount): Promise<string>;
  getSignatoryAccount(
    networkId: Chain["id"],
    address: string
  ): Promise<SignatoriesAccount | undefined>;
  updateSignatoryAccount(
    account: SignatoriesAccount,
    changes: Partial<SignatoriesAccount>
  ): Promise<number>;
  deleteSignatoryAccount(address: string): Promise<void>;
  findSignatoriesByThreshold(
    walletAddress: string,
    networkId?: Chain["id"]
  ): Promise<SignatoriesAccount[]>;
}
