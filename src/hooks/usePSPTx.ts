import { ContractPromise } from "@polkadot/api-contract";
import { useMemo } from "react";
import {
  Call,
  ChainContract,
  Tx,
  useCallSubscription,
  useEvents,
  useEventSubscription,
  useTx,
} from "useink";

import { usePSPContractPromise } from "./contractPromise/usePSPContractPromise";

type EventPayload = {
  createdAt: number;
  name: string;
  args: unknown[];
};

type Event = {
  id: string;
} & EventPayload;

export function usePSPTx({
  address,
  method,
  params,
  action,
}: {
  address: string;
  method: string;
  params?: unknown[];
  action?: "read" | "write";
}): {
  tx: Tx<unknown> | Omit<Call<unknown>, "send">;
  events: Event[];
  contract: ChainContract<ContractPromise> | undefined;
} {
  const { pSPContractPromise } = usePSPContractPromise(address);
  const contractAction = action ?? "read";
  const useMethod = useMemo(
    () => (contractAction === "read" ? useCallSubscription : useTx),
    [contractAction]
  );

  const pspTx = useMethod(pSPContractPromise, method, params);

  const contractAddress = pSPContractPromise?.contract.address;

  useEventSubscription(pSPContractPromise);
  const { events: pspEvents } = useEvents(contractAddress, [method]);

  return {
    contract: pSPContractPromise,
    tx: pspTx,
    events: pspEvents,
  };
}
