import { useCallback, useEffect, useState } from "react";
import { ChainId } from "useink/dist/chains";

import { getChain } from "@/config/chain";
import { TX_TYPE_IMG } from "@/config/images";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import {
  ExtendedDataType,
  TxType,
} from "@/domain/repositores/ITxQueueRepository";
import { customReportError } from "@/utils/error";

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
  },
};

const getTxType = (currentAccount: string, to: string) => {
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

export const buildTxDetail = (
  currentAccount: string,
  token: string,
  data: TxType
): ExtendedDataType => {
  let additionalInfo;
  if (data.__typename === TX_TYPE_OPTION.TRANSACTION) {
    // Send
    const type = getTxType(currentAccount, data.proposer);
    additionalInfo = {
      ...type,
      to: data.contractAddress,
      txStateMsg: "Awaiting confirmations",
    };
  } else {
    // Receive
    const type = getTxType(currentAccount, data.to);
    additionalInfo = {
      ...type,
      txStateMsg: "Success",
    };
  }

  //TODO: Contract Interaction??
  return {
    ...additionalInfo,
    ...data,
    token,
  } as ExtendedDataType;
};

export function useListTxQueue(address: string | undefined, network: ChainId) {
  const [data, setData] = useState<ExtendedDataType[] | undefined>(undefined);
  const chain = getChain(network);
  const [dataType, setDataType] = useState<{
    [name: string]: ExtendedDataType[] | undefined;
  }>({
    queue: undefined,
    history: undefined,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { txQueueRepository } = useLocalDbContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await txQueueRepository.getQueue(address);

        if (result) {
          const extendedResult = result.map((element) =>
            buildTxDetail(address, chain.token, element)
          );

          const queue = extendedResult?.filter(
            (element) => element.status === TX_TYPE_OPTION.STATUS.PROPOSED
          );

          const history = extendedResult?.filter(
            (element) => element.status !== TX_TYPE_OPTION.STATUS.PROPOSED
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
  }, [address, txQueueRepository, chain.token]);

  const listTxByType = useCallback(
    (key: TabTxTypes) => {
      if (dataType == null) return;
      return dataType[key];
    },
    [dataType]
  );

  return { data, listTxByType, isLoading, error };
}
