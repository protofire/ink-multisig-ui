import { ExternalTransactionData } from "@/domain/repositores/ISquidDbRepository";
import { RawExternalTransactionData } from "@/domain/repositores/IXsignerOwnersRepository";
import { hexStringToAscii } from "@/utils/formatString";

export function rawToExternalTransactionData(
  rawExtTxData: RawExternalTransactionData
): ExternalTransactionData {
  // Decode the hex string to Base64
  const base64String = hexStringToAscii(rawExtTxData.args);
  // Decode the Base64 string to JSON
  const decodedJsonString = atob(base64String);
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
