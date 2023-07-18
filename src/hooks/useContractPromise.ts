import { ContractPromise } from "@polkadot/api-contract";
import { useEffect, useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { MetadataState } from "@/domain";

export function useContractPromise(address: string, metadata: MetadataState) {
  const { apiPromise } = usePolkadotContext();
  const [contract, setContract] = useState<ContractPromise | undefined>();

  useEffect(() => {
    setContract(undefined);
    if (!metadata.value || !address || !apiPromise) return;

    const c = new ContractPromise(apiPromise, metadata.value, address);
    setContract(c);
  }, [address, apiPromise, metadata.value]);

  if (!contract) return undefined;

  return {
    abi: contract.abi,
    name: contract.abi.info.contract.name.toString(),
    tx: contract.tx,
    address: contract.address.toString(),
    contractPromise: contract,
  };
}
