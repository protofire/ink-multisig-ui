import { useApi } from "useink";

import { usePolkadotContext } from "@/context/usePolkadotContext";

export function useNetworkApi() {
  const { network } = usePolkadotContext();
  const api = useApi(network);

  return api;
}
