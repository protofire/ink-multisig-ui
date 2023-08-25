import { useMemo } from "react";
import { MultisigFactorySdk } from "xsigners-sdk-test";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { KeyringPair } from "@/services/substrate/types";
import { ChainId } from "@/services/useink/types";

import { useNetworkApi } from "./useNetworkApi";

interface UseSdkXsigners {
  multisigFactory: MultisigFactorySdk | undefined;
  network: ChainId | undefined;
  metadata?: { addressChain: string; ContractAbi: string };
}

export function useSdkXsigners(): UseSdkXsigners {
  const { apiPromise, network } = useNetworkApi() || {};
  const { accountConnected } = usePolkadotContext();

  const multisigFactory = useMemo(
    () =>
      apiPromise &&
      network &&
      accountConnected &&
      MultisigFactorySdk.factory(
        network,
        accountConnected as Partial<KeyringPair> as KeyringPair,
        apiPromise
      ),
    [accountConnected, apiPromise, network]
  );
  const metadata = useMemo(
    () => network && MultisigFactorySdk.contractMetadata(network),
    [network]
  );

  return { multisigFactory, network, metadata };
}
