import {
  call,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
} from "useink/core";
import { MultisigSdk, Psp22Sdk } from "xsigners-sdk-test";

import { ChainExtended } from "@/config/chain";
import { TX_TYPE_IMG } from "@/config/images";
import { ContractParam } from "@/domain/repositores/ISquidDbRepository";
import { TransactionProposed } from "@/domain/TransactionProposed";
import { TransactionDisplayInfo } from "@/domain/TransactionProposedItemUi";
import { ApiPromise, ContractPromise } from "@/services/substrate/types";
import { decodeCallArgs } from "@/utils/blockchain";
import { balanceToFixed, parseNativeBalance } from "@/utils/formatString";

const TRANSFER_METHOD_SELECTOR = "0x84a15da1";
const PSP22_TRANSFER_METHOD_SELECTOR = "0xdb20f9f5";

interface Props {
  multisigAddress: string;
  apiPromise: ApiPromise;
  txProposed: TransactionProposed;
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

  let contractPromise: ContractPromise;

  if (multisigAddress === txProposed.contractAddress) {
    const contractAbi = MultisigSdk.contractMetadata().ContractAbi;
    contractPromise = new ContractPromise(
      apiPromise,
      contractAbi,
      multisigAddress
    );

    const message = contractPromise.abi.messages.find(
      (message) => message.selector.toString() === txProposed.selector
    );

    const methodName = message?.method;

    if (!methodName) {
      displayInfo.to = txProposed.contractAddress;
      displayInfo.valueAmount = `${balanceToFixed(
        txProposed.value,
        nativeToken.decimals
      )} ${nativeToken.token}`;
      displayInfo.type = txProposed.methodName || txProposed.selector;
      return displayInfo;
    }

    const decodedData = decodeCallArgs(
      contractPromise,
      methodName!,
      txProposed.rawArgs as string // Always will be string
    );

    switch (methodName) {
      case "transfer": {
        displayInfo["valueAmount"] = `${parseNativeBalance(decodedData[1])} ${
          nativeToken.token
        }`;
        displayInfo["to"] = decodedData[0];
        displayInfo["img"] = TX_TYPE_IMG.SEND;
        break;
      }
      default: {
        txProposed.methodName = methodName!;
        txProposed.args;
        const args: ContractParam[] = [];
        decodedData.forEach((arg: any, index: number) => {
          args.push({
            name: message?.args[index].name,
            value: arg,
          });
        });
        txProposed.args = args;
        displayInfo.to = txProposed.contractAddress;
        displayInfo.valueAmount = `${balanceToFixed(
          txProposed.value,
          nativeToken.decimals
        )} ${nativeToken.token}`;
        displayInfo.type = methodName;
        //TODO: Maybe add setting img
        break;
      }
    }
  } else if (txProposed.selector === PSP22_TRANSFER_METHOD_SELECTOR) {
    const contractAbi = Psp22Sdk.contractMetadata().ContractAbi;
    contractPromise = new ContractPromise(
      apiPromise,
      contractAbi,
      txProposed.contractAddress
    );

    let tokenDecimals = undefined;
    let tokenSymbol = undefined;
    const decodedData = decodeCallArgs(
      contractPromise,
      "psp22::transfer",
      txProposed.rawArgs as string // Always will be string
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

    displayInfo.valueAmount = tokenDecimals
      ? `${balanceToFixed(
          decodedData[1],
          parseInt(tokenDecimals)
        )} ${tokenSymbol}`
      : "";
    displayInfo.to = decodedData[0];
    displayInfo.img = TX_TYPE_IMG.SEND;
  } else {
    displayInfo.to = txProposed.contractAddress;
    displayInfo.valueAmount = `${balanceToFixed(
      txProposed.value,
      nativeToken.decimals
    )} ${nativeToken.token}`;
    displayInfo.type = txProposed.methodName || txProposed.selector;
  }

  return displayInfo;
};
