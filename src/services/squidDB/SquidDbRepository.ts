import {
  ExternalTransactionData,
  ISquidDbRepository,
} from "@/domain/repositores/ISquidDbRepository";

import { Database } from "./Database";

export class SquidDbRepository implements ISquidDbRepository {
  private readonly db: Database;

  constructor() {
    this.db = new Database();
  }

  async insertTxData(extTxData: ExternalTransactionData): Promise<string> {
    const jsonString = JSON.stringify(extTxData.args);
    const base64String = btoa(jsonString);

    const insertedId = await this.db.insertTxData(
      extTxData.txHash,
      extTxData.methodName,
      base64String,
      extTxData.creationTimestamp,
      extTxData.inUse
    );

    return insertedId;
  }
}
