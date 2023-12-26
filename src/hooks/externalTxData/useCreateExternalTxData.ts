import { useState } from "react";

import { ExternalTransactionData } from "@/domain/repositores/ISquidDbRepository";
import { externalTxDataApiService } from "@/services/squidDB/ExternalTxDataApiService";
import { customReportError } from "@/utils/error";

type DraftExternalTxData = Pick<
  ExternalTransactionData,
  "txHash" | "methodName" | "args"
>;

export interface UseCreateExternalTxDataReturn {
  createTxData: (data: DraftExternalTxData) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export const useCreateExternalTxData = (): UseCreateExternalTxDataReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTxData = async (data: DraftExternalTxData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await externalTxDataApiService.createTxData({
        ...data,
        inUse: false,
        creationTimestamp: new Date(),
      });
      setIsLoading(false);
      return result;
    } catch (error) {
      const errorFormated = customReportError(error);

      setError(errorFormated);
      setIsLoading(false);
      console.error(errorFormated);
    }
  };

  return { createTxData, isLoading, error };
};
