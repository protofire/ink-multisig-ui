import { ApiPromise } from "@polkadot/api";
import { useApi } from "useink";

import { usePolkadotContext } from "@/context/usePolkadotContext";

export interface UseNetworkApi {
  apiPromise: ApiPromise;
}

export function useNetworkApi() {
  const { network } = usePolkadotContext();
  const api = useApi(network);

  return { apiPromise: api?.api, network };
}
