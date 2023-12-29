import { useCallback, useEffect, useState } from "react";
import { ChainId } from "useink/dist/chains";

import { getChain } from "@/config/chain";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { MultisigContractEvents } from "@/domain/events/MultisigContractEvents";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import {
  emptyDisplayInfo,
  TransactionProposedItemUi,
} from "@/domain/TransactionProposedItemUi";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { customReportError } from "@/utils/error";

import { useNetworkApi } from "../useNetworkApi";
import { getDisplayInfo } from "./getDisplayInfo";
import { mapOwnersToActions } from "./mapOwnersToActions";

export type TabTxTypes = "queue" | "history";

export const TX_OWNER_STATUS_TYPE = {
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PENDING: "Pending",
};

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
  },
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
  const { apiPromise } = useNetworkApi();
  const { decimals } = usePolkadotContext();

  useEventListenerCallback(MultisigContractEvents.TransactionProposed, () =>
    createTxList()
  );

  const createTxList = useCallback(async () => {
    if (!apiPromise) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await txQueueRepository.getQueue(xsignerAddress);

      if (!result) throw Error("Query failure");

      const extendedResult: TransactionProposedItemUi[] = result.map((tx) => ({
        ...tx,
        ...emptyDisplayInfo,
        ownersAction: [],
      }));
      setData(extendedResult);

      result.forEach(async (txProposed, index) => {
        const displayInfo = await getDisplayInfo({
          apiPromise,
          txProposed,
          multisigAddress: xsignerAddress,
          nativeToken: { ...chain, decimals },
        });

        extendedResult[index] = {
          ...txProposed,
          ownersAction: mapOwnersToActions({
            owners,
            approvals: txProposed.approvals,
            rejectors: txProposed.rejections,
            network,
          }),
          ...displayInfo,
        };

        setData((prev) => {
          if (!prev) return;

          const _newState = [...prev];
          _newState[index] = {
            ...txProposed,
            ownersAction: mapOwnersToActions({
              owners,
              approvals: txProposed.approvals,
              rejectors: txProposed.rejections,
              network,
            }),
            ...displayInfo,
          };

          return _newState;
        });
      });
    } catch (err) {
      customReportError(err);
      setError("An error has ocurred");
    } finally {
      setIsLoading(false);
    }
  }, [
    apiPromise,
    chain,
    decimals,
    network,
    owners,
    txQueueRepository,
    xsignerAddress,
  ]);

  useEffect(() => {
    createTxList();
  }, [createTxList]);

  return { data, isLoading, error };
}
