import { ISignatoriesAccountRepository } from "@/domain/repositores/ISignatoriesAccoutRepository";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { Chain } from "@/services/useink/types";

import { MyDatabase } from ".";

export class SignatoriesAccountDatabase
  implements ISignatoriesAccountRepository
{
  private db: MyDatabase;

  constructor(db: MyDatabase) {
    this.db = db;
  }
  async listXsignersAccount(
    networkId?: Chain["id"]
  ): Promise<SignatoriesAccount[]> {
    if (networkId) {
      return await this.db.signatoriesAccounts.where({ networkId }).toArray();
    }

    return await this.db.signatoriesAccounts.toArray();
  }

  async addSignatoryAccount(account: SignatoriesAccount): Promise<string> {
    return this.db.signatoriesAccounts.add(account);
  }

  async getSignatoryAccount(
    networkId: string,
    address: string
  ): Promise<SignatoriesAccount | undefined> {
    return await this.db.signatoriesAccounts.get([networkId, address]);
  }

  async updateSignatoryAccount(
    account: SignatoriesAccount,
    changes: Partial<SignatoriesAccount>
  ): Promise<number> {
    return this.db.signatoriesAccounts.update(account, changes);
  }

  async deleteSignatoryAccount(address: string): Promise<void> {
    return this.db.signatoriesAccounts.delete(address);
  }

  async findSignatoriesByOwner(
    walletAddress: string,
    networkId?: Chain["id"]
  ): Promise<SignatoriesAccount[]> {
    if (networkId) {
      return await this.db.signatoriesAccounts
        .where({ networkId })
        .filter((signatory) =>
          signatory.owners.map((owner) => owner.address).includes(walletAddress)
        )
        .toArray();
    } else {
      return await this.db.signatoriesAccounts
        .filter((signatory) =>
          signatory.owners.map((owner) => owner.address).includes(walletAddress)
        )
        .toArray();
    }
  }
}
