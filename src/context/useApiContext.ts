import { useApi, useWallet } from "useink";

import { RococoContractsTestnet } from "@/config/chain";

export const useApiContext = () => {
  const apiProvider = useApi(RococoContractsTestnet.id);
  const apiPromise = apiProvider?.api;
  const { accounts } = useWallet();

  return { apiPromise, apiProvider, accounts };
};
