import { ChainContract, useContract } from "useink";
import { Psp22Sdk } from "xsigners-sdk-test";

import { ContractPromise } from "@/services/substrate/types";
import { ChainId } from "@/services/useink/types";

import { useNetworkApi } from "../useNetworkApi";

interface UseSdkXsigners {
  pSPContractPromise: ChainContract<ContractPromise> | undefined;
  network: ChainId | undefined;
}

export function usePSPContractPromise(address: string): UseSdkXsigners {
  const { network } = useNetworkApi() || {};
  const metadata = Psp22Sdk.contractMetadata();
  const pSPContractPromise = useContract(
    address || "",
    JSON.parse(metadata?.ContractAbi || ""),
    network
  );

  return { pSPContractPromise, network };
}
