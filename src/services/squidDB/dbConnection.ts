import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 23798,
  database: process.env.DB_NAME || "squid",
});

export async function insertTxData(
  tx_hash: string,
  method_name: string,
  args: string,
  creationTimestamp: Date,
  inUse: boolean
) {
  const client = await pool.connect();

  const text = `
      INSERT INTO external_transaction_data (id, tx_hash, method_name, args, creation_timestamp, in_use)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

  const values = [
    tx_hash,
    tx_hash,
    method_name,
    args,
    creationTimestamp,
    inUse,
  ];
  console.log("values: ", values);
  try {
    const result = await pool.query(text, values);
    return result.rows[0].id;
  } catch (error) {
    throw new Error("Error inserting transaction data: " + error);
  } finally {
    client.release();
  }
}
