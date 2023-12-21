import { NextApiRequest, NextApiResponse } from "next";

import { SquidDbRepository } from "@/services/squidDB/SquidDbRepository";
import { getErrorMessage } from "@/utils/error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const squidDbRepository = new SquidDbRepository();
      const { txHash, methodName, args, creationTimestamp, inUse } = req.body;

      const insertedId: string = await squidDbRepository.insertTxData({
        txHash,
        methodName,
        args,
        creationTimestamp,
        inUse,
      });

      res.status(200).json({ success: true, insertedId });
    } catch (error) {
      res.status(500).json({ error: getErrorMessage(error) });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
