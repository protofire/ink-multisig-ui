import { useMemo } from "react";
import { MultisigFactory } from "xsigners-sdk-test/dist/xsigners_sdk/src";

import { useNetworkApi } from "./useNetworkApi";

export function useSdkXsigners() {
  const { apiPromise, network } = useNetworkApi() || {};
  const multisigFactory = useMemo(
    () => apiPromise && network && new MultisigFactory(apiPromise, network),
    [apiPromise, network]
  );

  return { multisigFactory, network };
}
