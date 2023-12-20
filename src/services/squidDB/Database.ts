import { Pool, QueryResult } from "pg";

export class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.NEXT_DB_USER || "appuser",
      password: process.env.NEXT_DB_PASS || "appuser",
      host: process.env.NEXT_DB_HOST || "localhost",
      port: process.env.NEXT_DB_PORT
        ? parseInt(process.env.NEXT_DB_PORT)
        : 23798,
      database: process.env.NEXT_DB_NAME || "squid",
    });
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
