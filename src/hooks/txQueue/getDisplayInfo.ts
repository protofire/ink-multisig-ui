import {
  call,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
} from "useink/core";
import { MultisigSdk, Psp22Sdk } from "xsigners-sdk-test";

import { ChainExtended } from "@/config/chain";
import { TX_TYPE_IMG } from "@/config/images";
import { FullTxProposed } from "@/domain/TransactionProposed";
import { TransactionDisplayInfo } from "@/domain/TransactionProposedItemUi";
import { ApiPromise, ContractPromise } from "@/services/substrate/types";
import { decodeCallArgs } from "@/utils/blockchain";
import { balanceToFixed, parseNativeBalance } from "@/utils/formatString";

const TRANSFER_METHOD_SELECTOR = "0x84a15da1";
const PSP22_TRANSFER_METHOD_SELECTOR = "0xdb20f9f5";

interface Props {
  multisigAddress: string;
  apiPromise: ApiPromise;
  txProposed: FullTxProposed;
  nativeToken: ChainExtended & { decimals: number };
}

type ResponseCall = { ok?: boolean; value: { decoded: string } };

function getValueResponse(response: ResponseCall) {
  if (!response.ok) return undefined;

  return response.value.decoded;
}

export const getDisplayInfo = async ({
  multisigAddress,
  apiPromise,
  txProposed,
  nativeToken,
}: Props): Promise<TransactionDisplayInfo> => {
  const displayInfo: TransactionDisplayInfo = {
    img: TX_TYPE_IMG.CONTRACT,
    type: "Send",
    txMsg: "to",
    valueAmount: "",
    to: undefined,
    from: undefined,
  };

  let contractPromise = new ContractPromise(
    apiPromise,
    MultisigSdk.contractMetadata().ContractAbi,
    multisigAddress
  );

  if (
    multisigAddress === txProposed.contractAddress &&
    txProposed.selector === TRANSFER_METHOD_SELECTOR
  ) {
    const decodedData = decodeCallArgs(
      contractPromise,
      "transfer",
      txProposed.rawArgs as string // always will be string in native transfer
    );

    displayInfo["valueAmount"] = `${parseNativeBalance(decodedData[1])} ${
      nativeToken.token
    }`;
    displayInfo["to"] = decodedData[0];
    displayInfo["img"] = TX_TYPE_IMG.SEND;
  } else if (txProposed.selector === PSP22_TRANSFER_METHOD_SELECTOR) {
    contractPromise = new ContractPromise(
      apiPromise,
      Psp22Sdk.contractMetadata().ContractAbi,
      txProposed.contractAddress
    );
    let tokenDecimals = undefined;
    let tokenSymbol = undefined;
    const decodedData = decodeCallArgs(
      contractPromise,
      "psp22::transfer",
      txProposed.rawArgs as string // always will be string in transfer UI
    );

    tokenDecimals = getValueResponse(
      await call(
        contractPromise,
        contractPromise.abi.findMessage("psp22Metadata::tokenDecimals"),
        multisigAddress
      )
    );
    tokenSymbol = getValueResponse(
      await call(
        contractPromise,
        contractPromise.abi.findMessage("psp22Metadata::tokenSymbol"),
        multisigAddress
      )
    );

    displayInfo["valueAmount"] = tokenDecimals
      ? `${balanceToFixed(
          decodedData[1],
          parseInt(tokenDecimals)
        )} ${tokenSymbol}`
      : "";
    displayInfo["to"] = decodedData[0];
    displayInfo["img"] = TX_TYPE_IMG.SEND;
  } else {
    displayInfo["to"] = txProposed.contractAddress;

    displayInfo["valueAmount"] = `${balanceToFixed(
      txProposed.value,
      nativeToken.decimals
    )} ${nativeToken.token}`;
    displayInfo["type"] = txProposed.methodName || txProposed.selector;
  }
  return displayInfo;
};

export const getDisplayTransferInfo = async ({
  txProposed,
  nativeToken,
}: Props): Promise<TransactionDisplayInfo> => {
  const displayInfo: TransactionDisplayInfo = {
    img: TX_TYPE_IMG.RECEIVE,
    type: "Receive",
    txMsg: "from",
    valueAmount: "",
    to: txProposed.to,
    from: txProposed.from,
  };

  displayInfo["valueAmount"] = `${balanceToFixed(
    txProposed.value,
    nativeToken.decimals
  )} ${nativeToken.token}`;

  return displayInfo;
};
