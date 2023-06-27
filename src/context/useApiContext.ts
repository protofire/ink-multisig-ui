import { useApi, useWallet } from "useink";

import { CHAINS_ALLOWED } from "@/config/chain";

export const useApiContext = () => {
  const apiProvider = useApi(CHAINS_ALLOWED[0].id);
  const apiPromise = apiProvider?.api;
  const { accounts } = useWallet();

  return { apiPromise, apiProvider, accounts };
};
