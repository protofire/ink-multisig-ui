// import { useDryRun } from "useink";
import { ChainId } from "useink/dist/chains";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { ContractPromise } from "@/services/substrate/types";
import { useDryRun } from "@/services/useink/hooks/useDryRun";

export function useGetDryRun(
  contract: ContractPromise | undefined,
  messageName: string,
  caller?: string
) {
  const { network } = usePolkadotContext();
  const genericDryRun = useDryRun(
    contract && { contract, chainId: network as ChainId },
    messageName || "",
    caller
  );

  return genericDryRun;
}
