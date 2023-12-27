import { ChainId } from "useink/dist/chains";

import { TX_TYPE_IMG } from "@/config/images";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { TransactionProposed } from "@/domain/TransactionProposed";
import {
  TransactionDisplayInfo,
  TransactionProposedItemUi,
} from "@/domain/TransactionProposedItemUi";

import { mapOwnersToActions } from "./mapOwnersToActions";

const getTxInfo = (
  currentAccount: string,
  to: string
): TransactionDisplayInfo => {
  const receive: TransactionDisplayInfo = {
    img: TX_TYPE_IMG.RECEIVE,
    type: "Receive",
    txMsg: "from",
  };
  const send: TransactionDisplayInfo = {
    img: TX_TYPE_IMG.SEND,
    type: "Send",
    txMsg: "to",
  };
  return currentAccount === to ? receive : send;
};

export function toTxProposedItemUi(
  txProposed: TransactionProposed,
  network: ChainId,
  owners: SignatoriesAccount["owners"]
): TransactionProposedItemUi {
  const ownersAction = mapOwnersToActions({
    owners,
    approvals: txProposed.approvals,
    rejectors: txProposed.rejections,
    network,
  });

  const displayTxInfo = getTxInfo(
    txProposed.contractAddress,
    txProposed.proposer
  );

  return {
    ...txProposed,
    ownersAction,
    ...displayTxInfo,
  };
}
