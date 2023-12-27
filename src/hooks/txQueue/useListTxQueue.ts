import { ContractPromise } from "@polkadot/api-contract";
import { useCallback, useEffect, useState } from "react";
import { ChainContract } from "useink";
import { ChainId } from "useink/dist/chains";

import { getChain } from "@/config/chain";
import { TX_TYPE_IMG } from "@/config/images";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { TransactionEvents } from "@/domain/events/TransactionEvents";
import {
  ExtendedDataType,
  Order,
  TxType,
} from "@/domain/repositores/ITxQueueRepository";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { decodeCallArgs } from "@/utils/blockchain";
import { customReportError } from "@/utils/error";
import { balanceToFixed, parseNativeBalance } from "@/utils/formatString";

import { usePSPContractPromise } from "../contractPromise/usePSPContractPromise";
import { getDisplayInfo } from "./getDisplayInfo";
import { mapOwnersToActions } from "./mapOwnersToActions";

export type TabTxTypes = "queue" | "history";

export const TX_TYPE_OPTION = {
  RECEIVE: "Receive",
  SEND: "Send",
  TRANSACTION: "Transaction",
  TRANSFER: "Transfer",
  TOKEN: {
    NATIVE: "NATIVE",
  },
  STATUS: {
    PROPOSED: "PROPOSED",
    EXECUTED_SUCCESS: "EXECUTED_SUCCESS",
    APPROVAL: "Approval",
  },
};

const FIXED_TOKEN_DECIMALS = 18;

const getTxInfo = (currentAccount: string, to: string) => {
  const receive = {
    img: TX_TYPE_IMG.RECEIVE,
    type: "Receive",
    txMsg: "from",
  };
  const send = {
    img: TX_TYPE_IMG.SEND,
    type: "Send",
    txMsg: "to",
  };
  return currentAccount == to ? receive : send;
};

const createTxOwnerStepper = (
  owners: Order[] | undefined,
  approvals: Order[] | undefined,
  rejectes: Order[] | undefined
) => {
  return owners?.reduce<Order[]>((prev, item) => {
    const matchingApp = approvals?.find(
      (element) => item.address === element.address
    );
    const rejected = rejectes?.find(
      (element) => item.address === element.address
    );

    if (matchingApp) {
      return [
        ...prev,
        {
          address: item.address,
          name: item.name,
          status: matchingApp.status,
        },
      ];
    } else if (rejected) {
      return [
        ...prev,
        {
          address: item.address,
          name: item.name,
          status: rejected.status,
        },
      ];
    } else {
      return [...prev, item];
    }
  }, []);
};

const methodName = "transfer";
const methodSelector = "0x1f154c5b"; // Transfer

const buildTxDetail = (
  xsignerAddress: string,
  token: string,
  data: TxType,
  stepperData: Order[] | undefined,
  multisigContractPromise: ChainContract<ContractPromise>
): ExtendedDataType | null => {
  let additionalInfo;
  let txStateMsg = "Success";

  if (data.__typename === TX_TYPE_OPTION.TRANSACTION) {
    if (data.selector === methodSelector) return null;
    const decodedData = decodeCallArgs(
      multisigContractPromise.contract,
      methodName,
      data.args!
    );

    const parseValue = parseNativeBalance(decodedData[1]);
    const txInfo = getTxInfo(xsignerAddress, data.proposer);
    if (data.status === TX_TYPE_OPTION.STATUS.PROPOSED) {
      txStateMsg = "Awaiting confirmations";
    }

    additionalInfo = {
      ...txInfo,
      txStateMsg,
      to: decodedData[0],
      value: parseValue,
    };
  }

  if (data.__typename === TX_TYPE_OPTION.TRANSFER) {
    const txInfo = getTxInfo(xsignerAddress, data.to);

    // Omit the Send Transfer type
    if (txInfo.type === TX_TYPE_OPTION.SEND) return null;

    // Clean Value to display correct human value
    const value = balanceToFixed(
      data.value,
      Number.isNaN(parseInt(data.tokenDecimals))
        ? FIXED_TOKEN_DECIMALS
        : parseInt(data.tokenDecimals)
    );

    additionalInfo = {
      ...txInfo,
      txStateMsg,
      value,
    };
  }
  return {
    ...data,
    stepperData,
    token,
    ...additionalInfo,
  } as ExtendedDataType;
};

export function useListTxQueue(
  xsignerAccount: SignatoriesAccount,
  network: ChainId
) {
  const [data, setData] = useState<TransactionProposedItemUi[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chain = getChain(network);
  const { owners, address: xsignerAddress } = xsignerAccount;
  const { txQueueRepository } = useLocalDbContext();
  const { multisigContractPromise } =
    useMultisigContractPromise(xsignerAddress);
  const { pSPContractPromise } = usePSPContractPromise("");

  const [dataType, setDataType] = useState<{
    [name: string]: (ExtendedDataType | null)[] | undefined;
  }>({
    queue: undefined,
    history: undefined,
  });

  useEventListenerCallback([TransactionEvents.transactionSent], () => {
    // createTxList();
  });

  const createTxList = useCallback(async () => {
    if (!multisigContractPromise || !pSPContractPromise) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await txQueueRepository.getQueue(xsignerAddress);

      if (!result) throw Error("Query failure");

      const extendedResult = result.map((txProposed) => ({
        ...txProposed,
        ownersAction: mapOwnersToActions({
          owners,
          approvals: txProposed.approvals,
          rejectors: txProposed.rejections,
          network,
        }),
        ...getDisplayInfo({
          multisigContractPromise: multisigContractPromise.contract,
          pspContractPromise: pSPContractPromise.contract,
          txProposed,
          multisigAddress: xsignerAddress,
          nativeTokenSymbol: chain.token,
        }),
      }));

      setData(extendedResult);
    } catch (err) {
      customReportError(err);
      setError("An error has ocurred");
    } finally {
      setIsLoading(false);
    }
  }, [
    multisigContractPromise,
    network,
    owners,
    pSPContractPromise,
    txQueueRepository,
    xsignerAddress,
  ]);

  useEffect(() => {
    createTxList();
  }, [createTxList]);

  const listTxByType = useCallback(
    (key: TabTxTypes) => {
      if (dataType == null) return;
      return dataType[key];
    },
    [dataType]
  );

  return { data, listTxByType, isLoading, error };
}
