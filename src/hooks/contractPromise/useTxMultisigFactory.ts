import { ChainContract, useContract } from "useink";
import { MultisigFactorySdk } from "xsigners-sdk-test";

import { ContractPromise } from "@/services/substrate/types";
import { ChainId } from "@/services/useink/types";

import { useNetworkApi } from "../useNetworkApi";

interface UseSdkXsigners {
  multisigFactoryContract: ChainContract<ContractPromise> | undefined;
  network: ChainId | undefined;
}

export function useMultisigFactoryContract(): UseSdkXsigners {
  const { network } = useNetworkApi() || {};
  const metadata = network && MultisigFactorySdk.contractMetadata(network);
  const multisigFactoryContract = useContract(
    metadata?.addressChain || "",
    JSON.parse(metadata?.ContractAbi || ""),
    network
  );

  return { multisigFactoryContract, network };
}
