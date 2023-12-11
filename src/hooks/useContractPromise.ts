import { ContractPromise } from "@polkadot/api-contract";
import { useEffect, useMemo, useState } from "react";
import { useApi } from "useink";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { AbiSource, MetadataState } from "@/domain";
import { MetadataManager } from "@/services/substrate/MetadataManager";
import { ApiPromise } from "@/services/substrate/types";

export function useContractPromise(address: string, metadata: MetadataState) {
  const { network } = usePolkadotContext();
  const api = useApi(network);
  const { api: apiPromise } = api || {};
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

const metadataManager = new MetadataManager();

export function useContractPromiseFromSource(
  contractAddress: string,
  abiSource: AbiSource,
  apiPromise: ApiPromise | undefined
) {
  const derivedMetadata = useMemo(
    () =>
      metadataManager.deriveFromJson(
        { isWasmRequired: false },
        abiSource,
        apiPromise
      ),
    [abiSource, apiPromise]
  );

  return useContractPromise(contractAddress, derivedMetadata);
}
