import { ISignatoriesAccountRepository } from "@/domain/repositores/ISignatoriesAccoutRepository";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { Chain, ChainId } from "@/services/useink/types";

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
    return this.db.signatoriesAccounts.add(account) as Promise<string>;
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
    return await this.db.signatoriesAccounts.update(account, changes);
  }

  async deleteSignatoryAccount(
    address: string,
    networkId: ChainId
  ): Promise<void> {
    const deleteKey = [networkId as string, address];
    return this.db.signatoriesAccounts.delete(deleteKey);
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

  async updateSignatoriesAccountsInBatch(
    accounts: SignatoriesAccount[]
  ): Promise<void> {
    try {
      await this.db.signatoriesAccounts.bulkPut(accounts);
      console.debug("Signatories accounts updated successfully");
    } catch (error) {
      console.error("Error updating signatories accounts:", error);
    }
  }
}
