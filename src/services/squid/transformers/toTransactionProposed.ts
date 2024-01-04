import { ExternalTransactionData } from "@/domain/repositores/ISquidDbRepository";
import { RawTransactionProposed } from "@/domain/repositores/ITxQueueRepository";
import {
  Approval,
  Rejection,
  TransactionProposed,
} from "@/domain/TransactionProposed";

import { rawToExternalTransactionData } from "./toExternalTxData";

function createApprovals(
  rawApprovals: RawTransactionProposed["approvals"]
): Approval[] {
  return rawApprovals.map((approval) => ({
    approver: approval.approver,
    approvalTimestamp: new Date(approval.approvalTimestamp),
  }));
}

function createRejections(
  rawRejections: RawTransactionProposed["rejections"]
): Rejection[] {
  return rawRejections.map((rejection) => ({
    rejector: rejection.rejector,
    rejectionTimestamp: new Date(rejection.rejectionTimestamp),
  }));
}

function parseRawExternalTransactionData(
  rawExtTxData: RawTransactionProposed["externalTransactionData"]
): {
  methodName: ExternalTransactionData["methodName"] | null;
  args: ExternalTransactionData["args"] | null;
} {
  if (rawExtTxData) {
    const txData = rawToExternalTransactionData(rawExtTxData);
    return {
      methodName: txData.methodName,
      args: txData.args,
    };
    //return data;
  }
  //TODO: Try to decode args using existing contractPromises
  return { methodName: null, args: null };
}

export function rawToTransactionProposed(
  rawTransaction: RawTransactionProposed
): TransactionProposed {
  const { methodName, args } = parseRawExternalTransactionData(
    rawTransaction.externalTransactionData
  );
  const rawArgs = rawTransaction.args === "0x" ? null : rawTransaction.args;
  return {
    approvalCount: rawTransaction.approvalCount,
    approvals: createApprovals(rawTransaction.approvals),
    args,
    rawArgs,
    contractAddress: rawTransaction.contractAddress,
    creationBlockNumber: rawTransaction.creationBlockNumber,
    creationTimestamp: new Date(rawTransaction.creationTimestamp),
    error: rawTransaction.error ?? null,
    executionTxHash: rawTransaction.executionTxHash ?? null,
    id: rawTransaction.id,
    lastUpdatedBlockNumber: rawTransaction.lastUpdatedBlockNumber,
    lastUpdatedTimestamp: new Date(rawTransaction.lastUpdatedTimestamp),
    proposalTxHash: rawTransaction.proposalTxHash,
    proposer: rawTransaction.proposer,
    rejectionCount: rawTransaction.rejectionCount,
    rejections: createRejections(rawTransaction.rejections),
    selector: rawTransaction.selector,
    methodName,
    status: rawTransaction.status,
    txId: rawTransaction.txId,
    value: rawTransaction.value,
  };
}
