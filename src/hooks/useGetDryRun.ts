import { useDryRun } from "useink";
import { ChainId } from "useink/dist/chains";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { ContractPromise } from "@/services/substrate/types";

export function useGetDryRun(
  contract: ContractPromise | undefined,
  messageName: string
) {
  const { network } = usePolkadotContext();
  const genericDryRun = useDryRun(
    contract && { contract, chainId: network as ChainId },
    messageName || ""
  );

  return genericDryRun;
}
