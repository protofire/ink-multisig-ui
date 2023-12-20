import { ExternalTransactionData } from "@/domain/repositores/ISquidDbRepository";
import { RawExternalTransactionData } from "@/domain/repositores/IXsignerOwnersRepository";

export function rawToExternalTransactionData(
  rawExtTxData: RawExternalTransactionData
): ExternalTransactionData {
  // Decode the Base64 string to JSON
  const decodedJsonString = atob(rawExtTxData.args);
  // Parse the JSON string to get back the array
  const decodedArrayOfStrings = JSON.parse(decodedJsonString);
  return {
    txHash: rawExtTxData.id,
    methodName: rawExtTxData.methodName,
    args: decodedArrayOfStrings,
    creationTimestamp: rawExtTxData.creationTimestamp,
    inUse: rawExtTxData.inUse,
  };
}
