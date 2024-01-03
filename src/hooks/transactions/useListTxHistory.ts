import { useCallback, useEffect, useState } from "react";
import { ChainId } from "useink/dist/chains";

import { getChain } from "@/config/chain";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import {
  emptyDisplayInfo,
  TransactionDisplayInfo,
  TransactionProposedItemUi,
} from "@/domain/TransactionProposedItemUi";
import { customReportError } from "@/utils/error";

import { useNetworkApi } from "../useNetworkApi";
import { getDisplayInfo, getDisplayTransferInfo } from "./getDisplayInfo";
import { mapOwnersToActions } from "./mapOwnersToActions";

export function useListTxHistory(
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
  const { txHistoryRepository } = useLocalDbContext();
  const { apiPromise } = useNetworkApi();
  const { decimals } = usePolkadotContext();

  const buildTxhistoryList = useCallback(async () => {
    if (!apiPromise) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await txHistoryRepository.getHistory(xsignerAddress);
      if (!result) throw Error("Query failure");

      const extendedResult: TransactionProposedItemUi[] = result.map((tx) => ({
        ...tx,
        ...emptyDisplayInfo,
        ownersAction: [],
      }));
      setData(extendedResult);

      result.forEach(async (txProposed, index) => {
        let displayInfo: TransactionDisplayInfo;
        displayInfo = await getDisplayInfo({
          apiPromise,
          txProposed,
          multisigAddress: xsignerAddress,
          nativeToken: { ...chain, decimals },
        });

        if (txProposed.typename === "Transaction") {
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
        } else {
          displayInfo = await getDisplayTransferInfo({
            apiPromise,
            txProposed,
            multisigAddress: xsignerAddress,
            nativeToken: { ...chain, decimals },
          });

          setData((prev) => {
            if (!prev) return;
            const _newState = [...prev];
            _newState[index] = {
              ...txProposed,
              ownersAction: [],
              ...displayInfo,
            };
            return _newState;
          });
        }
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
    txHistoryRepository,
    xsignerAddress,
  ]);

  useEffect(() => {
    buildTxhistoryList();
  }, [buildTxhistoryList]);

  return { data, isLoading, error };
}
