import { API_PATHS } from "@/config/routes";
import { ExternalTransactionData } from "@/domain/repositores/ISquidDbRepository";

const API_BASE_URL = "/api";

export const externalTxDataApiService = {
  async createTxData(data: ExternalTransactionData) {
    const response = await fetch(`${API_BASE_URL}${API_PATHS.insertTxData}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};
