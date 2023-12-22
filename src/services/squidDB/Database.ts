import { Pool, QueryResult } from "pg";

import {
  NEXT_DB_HOST,
  NEXT_DB_NAME,
  NEXT_DB_PASS,
  NEXT_DB_PORT,
  NEXT_DB_USER,
} from "@/config/squid";

const config = {
  user: NEXT_DB_USER,
  password: NEXT_DB_PASS,
  host: NEXT_DB_HOST,
  port: NEXT_DB_PORT,
  database: NEXT_DB_NAME,
};

export class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(config);
  }

  async query(text: string, values: unknown[]): Promise<QueryResult> {
    const client = await this.pool.connect();

    try {
      return await client.query(text, values);
    } finally {
      client.release();
    }
  }

  async insertTxData(
    tx_hash: string,
    method_name: string,
    args: string,
    creationTimestamp: Date,
    inUse: boolean
  ): Promise<string> {
    const text = `
      INSERT INTO external_transaction_data (id, method_name, args, creation_timestamp, in_use)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const values = [tx_hash, method_name, args, creationTimestamp, inUse];

    const result = await this.query(text, values);

    return result.rows[0].id;
  }
}
