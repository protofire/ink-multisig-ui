import { NextApiRequest, NextApiResponse } from "next";

import { getErrorMessage } from "@/utils/error";

import { insertTxData } from "../../services/squidDB/dbConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { tx_hash, method_name, args, creationTimestamp, inUse } = req.body;

      const insertedId = await insertTxData(
        tx_hash,
        method_name,
        args,
        creationTimestamp,
        inUse
      );

      res.status(200).json({ success: true, insertedId });
    } catch (error) {
      res.status(500).json({ error: getErrorMessage(error) });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
