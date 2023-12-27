import { TX_TYPE_IMG } from "@/config/images";
import { TransactionProposed } from "@/domain/TransactionProposed";
import { TransactionDisplayInfo } from "@/domain/TransactionProposedItemUi";
import { ContractPromise } from "@/services/substrate/types";
import { decodeCallArgs } from "@/utils/blockchain";
import { parseNativeBalance } from "@/utils/formatString";

const TRANSFER_METHOD_SELECTOR = "0x84a15da1";
const PSP22_TRANSFER_METHOD_SELECTOR = "0xdb20f9f5";

interface Props {
  multisigAddress: string;
  pspContractPromise: ContractPromise;
  multisigContractPromise: ContractPromise;
  txProposed: TransactionProposed;
  nativeTokenSymbol: string;
}
function getValueAmount(
  contractPromise: ContractPromise,
  methodName: string,
  args: string
) {
  const decodedData = decodeCallArgs(contractPromise, methodName, args);

  return parseNativeBalance(decodedData[1]);
}

export const getDisplayInfo = ({
  multisigAddress,
  pspContractPromise,
  multisigContractPromise,
  txProposed,
  nativeTokenSymbol,
}: Props): TransactionDisplayInfo => {
  const displayInfo: TransactionDisplayInfo = {
    img: TX_TYPE_IMG.SEND,
    type: "Send",
    txMsg: "to",
    valueAmount: "",
  };

  if (
    multisigAddress === txProposed.contractAddress &&
    txProposed.selector === TRANSFER_METHOD_SELECTOR
  ) {
    displayInfo["valueAmount"] = `${getValueAmount(
      multisigContractPromise,
      "transfer",
      txProposed.args as string // always will be string in native transfer
    )} ${nativeTokenSymbol}`;
  } else if (txProposed.selector === PSP22_TRANSFER_METHOD_SELECTOR) {
    displayInfo["valueAmount"] = `${
      decodeCallArgs(
        pspContractPromise,
        "psp22::transfer",
        txProposed.args as string // always will be string in transfer UI
      )[1]
    } `;
  }

  //   const receive: TransactionDisplayInfo = {
  //     img: TX_TYPE_IMG.RECEIVE,
  //     type: "Receive",
  //     txMsg: "from",
  //   };
  //   const send: TransactionDisplayInfo = {
  //     img: TX_TYPE_IMG.SEND,
  //   type: "Send",

  //     txMsg: "to",
  //   };
  //   return currentAccount === to ? receive : send;
  //
  return displayInfo;
};
