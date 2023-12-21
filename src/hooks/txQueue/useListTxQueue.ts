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
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useListSignersAccount } from "@/hooks/xsignersAccount";
import { decodeCallArgs, formatAddressForNetwork } from "@/utils/blockchain";
import { customReportError } from "@/utils/error";
import { balanceToFixed, parseNativeBalance } from "@/utils/formatString";

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

const buildTxDetail = (
  xsignerAddress: string,
  token: string,
  data: TxType,
  stepperData: Order[] | undefined,
  multisigContractPromise: ChainContract<ContractPromise>
): ExtendedDataType | null => {
  let additionalInfo;
  if (
    data.__typename === TX_TYPE_OPTION.TRANSACTION &&
    data.status === TX_TYPE_OPTION.STATUS.PROPOSED
  ) {
    const decodedData = decodeCallArgs(
      multisigContractPromise.contract,
      methodName,
      data.args!
    );

    const parseValue = parseNativeBalance(decodedData[1]);

    // Send
    const txInfo = getTxInfo(xsignerAddress, data.proposer);
    additionalInfo = {
      ...txInfo,
      to: decodedData[0],
      value: parseValue,
      txStateMsg: "Awaiting confirmations",
    };
  }

  if (
    data.__typename === TX_TYPE_OPTION.TRANSACTION &&
    data.status === TX_TYPE_OPTION.STATUS.EXECUTED_SUCCESS
  ) {
    const decodedData = decodeCallArgs(
      multisigContractPromise.contract,
      methodName,
      data.args!
    );

    const parseValue = parseNativeBalance(decodedData[1]);

    // Send
    const txInfo = getTxInfo(xsignerAddress, data.proposer);
    additionalInfo = {
      ...txInfo,
      to: decodedData[0],
      value: parseValue,
      txStateMsg: "Success",
    };
  } else if (data.__typename === TX_TYPE_OPTION.TRANSFER) {
    const txInfo = getTxInfo(xsignerAddress, data.to);

    // Transfer Send
    if (txInfo.type === TX_TYPE_OPTION.SEND) return null;

    // Transfer Receive
    // Clean Value to display correct human value
    const value = balanceToFixed(
      data.value,
      Number.isNaN(parseInt(data.tokenDecimals))
        ? FIXED_TOKEN_DECIMALS
        : parseInt(data.tokenDecimals)
    );

    additionalInfo = {
      ...txInfo,
      txStateMsg: "Success",
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
  xsignersAddress: string | undefined,
  network: ChainId
) {
  const [data, setData] = useState<(ExtendedDataType | null)[]>([]);
  const chain = getChain(network);
  const { data: signers } = useListSignersAccount({ networkId: network });
  const { multisigContractPromise } =
    useMultisigContractPromise(xsignersAddress);

  const [dataType, setDataType] = useState<{
    [name: string]: (ExtendedDataType | null)[] | undefined;
  }>({
    queue: undefined,
    history: undefined,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { txQueueRepository } = useLocalDbContext();

  // useEventListenerCallback([TransactionEvents.transactionSent], () => {
  //   console.log("entre Aca");
  //   // createTxList();
  // });

  useEffect(() => {
    document.addEventListener(TransactionEvents.transactionSent, () => {
      console.log("entre Aca");
    });

    return () => {
      document.removeEventListener(TransactionEvents.transactionSent, () => {
        console.log("entre Aca");
      });
    };
  }, []);

  const createTxList = useCallback(() => {
    const fetchData = async () => {
      if (!xsignersAddress) return;
      if (!multisigContractPromise) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await txQueueRepository.getQueue(xsignersAddress);
        if (result) {
          const extendedResult = result
            .map((element) => {
              // List all owners from a xsignerAddress
              const ownersData = signers
                ?.find((element) => element.address === xsignersAddress)
                ?.owners.map((element) => ({
                  address: formatAddressForNetwork(element.address, network),
                  name: element.name,
                  status: "Pending",
                }));

              // Clean Approvals data to follow the {address, status, name} format
              const approvals = element.approvals?.map((element) => ({
                address: element.approver,
                status: element.__typename,
                name: "",
              }));

              // Clean Rejections data to follow the {address, status, name} format
              const rejections = element.rejections?.map((element) => ({
                address: element.rejected,
                status: element.__typename,
                name: "",
              }));

              // Combine Approvals and Rejections using OwnersData as root
              const stepperData = createTxOwnerStepper(
                ownersData,
                approvals,
                rejections
              );

              // Build Transaction with missing attributes
              return buildTxDetail(
                xsignersAddress,
                chain.token,
                element,
                stepperData,
                multisigContractPromise as ChainContract<ContractPromise>
              );
            }) // Remove null elements
            .filter((element) => element !== null);

          // Divide the results in Queue and History
          const queue = extendedResult?.filter(
            (element) => element!.status === TX_TYPE_OPTION.STATUS.PROPOSED
          );

          const history = extendedResult?.filter(
            (element) => element!.status !== TX_TYPE_OPTION.STATUS.PROPOSED
          );

          setData(extendedResult);
          setDataType({
            queue: queue,
            history: history,
          });
        }
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().finally(() => {
      setIsLoading(false);
    });
  }, [
    multisigContractPromise?.contract,
    chain.token,
    network,
    signers,
    txQueueRepository,
    xsignersAddress,
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
