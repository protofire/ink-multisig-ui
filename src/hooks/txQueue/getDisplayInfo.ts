import {
  call,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
} from "useink/core";
import { MultisigSdk, Psp22Sdk } from "xsigners-sdk-test";

import { TX_TYPE_IMG } from "@/config/images";
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
  nativeTokenSymbol: string;
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
  nativeTokenSymbol,
}: Props): Promise<TransactionDisplayInfo> => {
  const displayInfo: TransactionDisplayInfo = {
    img: TX_TYPE_IMG.SEND,
    type: "Send",
    txMsg: "to",
    valueAmount: "",
    to: "",
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
      txProposed.args as string // always will be string in native transfer
    );

    displayInfo["valueAmount"] = `${parseNativeBalance(
      decodedData[1]
    )} ${nativeTokenSymbol}`;
    displayInfo["to"] = decodedData[0];
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
      txProposed.args as string // always will be string in transfer UI
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
  }

  return displayInfo;
};
