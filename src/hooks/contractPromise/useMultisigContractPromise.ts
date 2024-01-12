import { ChainContract, useContract } from "useink";
import { MultisigSdk } from "xsigners-sdk-test";

import { ContractPromise } from "@/services/substrate/types";
import { ChainId } from "@/services/useink/types";

import { useNetworkApi } from "../useNetworkApi";

interface UseSdkXsigners {
  multisigContractPromise: ChainContract<ContractPromise> | undefined;
  network: ChainId | undefined;
}

export function useMultisigContractPromise(address?: string): UseSdkXsigners {
  const { network } = useNetworkApi() || {};
  const metadata = MultisigSdk.contractMetadata();
  const multisigContractPromise = useContract(
    address || "",
    JSON.parse(metadata?.ContractAbi || ""),
    network
  );
  // const contractArgs = useMemo(() => {
  //   return [address || "", JSON.parse(metadata?.ContractAbi || ""), network];
  // }, [address, metadata?.ContractAbi, network]);

  // const multisigContractPromise = useContract(
  //   contractArgs[0],
  //   contractArgs[1],
  //   contractArgs[2]
  // );

  return { multisigContractPromise, network };
}
