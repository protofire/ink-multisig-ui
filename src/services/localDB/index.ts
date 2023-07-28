import Dexie from "dexie";

import { SignatoriesAccount } from "@/domain/SignatoriesAccount";

export class MyDatabase extends Dexie {
  public signatoriesAccounts: Dexie.Table<SignatoriesAccount, string>;

  constructor() {
    super("MyDatabase");

    this.version(1).stores({
      signatoriesAccounts: "[networkId+address],networkId",
    });

    this.signatoriesAccounts = this.table("signatoriesAccounts");
  }
}
