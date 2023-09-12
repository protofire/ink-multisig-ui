import { ContractPromise } from "@polkadot/api-contract";
import { useMemo } from "react";
import { Call, ChainContract, Tx, useCall, useTx } from "useink";

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
  action,
}: {
  address: string;
  method: string;
  action?: "read" | "write";
}): {
  tx: Tx<unknown> | Call<unknown>;
  events: Event[];
  contract: ChainContract<ContractPromise> | undefined;
} {
  const { pSPContractPromise } = usePSPContractPromise(address);
  const contractAction = action ?? "read";
  const useMethod = useMemo(
    () => (contractAction === "read" ? useCall : useTx),
    [contractAction]
  );

  const pspTx = useMethod(pSPContractPromise, method);

  const contractAddress = pSPContractPromise?.contract.address;

  //useEventSubscription(pSPContractPromise);
  //const { events: pspEvents } = useEvents(contractAddress, [method]);

  return {
    contract: pSPContractPromise,
    tx: pspTx,
    events: [],
  };
}
