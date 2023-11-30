import { Abi, ContractPromise } from "@polkadot/api-contract";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ContractExecResult,
  decodeCallResult,
  toContractAbiMessage,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
} from "useink/core";
import { ChainId } from "useink/dist/chains";
import { Psp22Sdk } from "xsigners-sdk-test";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { useCall } from "@/hooks/useCall";
import { BN_ZERO } from "@/utils/bn";

import { useNetworkApi } from "../useNetworkApi";
import { useGetXsignerSelected } from "../xsignerSelected/useGetXsignerSelected";

export type AssetType = "token" | "nft";

export type Asset = {
  address: string;
  name: string;
  balance: string;
  networkId: ChainId;
};

const DEFAULT_DATA = {
  token: [],
  nft: [],
};

function useFetchAssets(address: string) {
  const [data, setData] = useState<{ token: Asset[]; nft: any[] }>(
    DEFAULT_DATA
  );
  const { assetRepository } = useLocalDbContext();
  const { xSignerSelected } = useGetXsignerSelected();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { apiPromise } = useNetworkApi() || {};
  const metadata = Psp22Sdk.contractMetadata();
  const abi = useMemo(
    () =>
      apiPromise &&
      new Abi(
        JSON.parse(metadata?.ContractAbi || ""),
        apiPromise.registry.getChainProperties()
      ),
    [apiPromise, metadata]
  );
  const checkIfExist = useCallback(
    (name: string, balance: string) => {
      if (!balance || !name) return false;

      return data.token.some(
        (item) => item.name === name && item.balance === balance
      );
    },
    [data.token]
  );

  const { data: getName, error: nameError } = useCall(
    address,
    "psp22Metadata::tokenName"
  );
  const { data: getBalance, error: balanceError } = useCall(
    address,
    "psp22::balanceOf",
    xSignerSelected?.address,
    [xSignerSelected?.address || ""]
  );

  useEffect(() => {
    async function fetchAssets() {
      if (!xSignerSelected?.networkId) return;
      const assets = assetRepository.getAssetList(
        xSignerSelected.networkId as ChainId
      );

      // Use Promise.all to wait for all promises to resolve
      const assetsWithBalanceUpdated = await Promise.all(
        assets.map(async (asset) => {
          if (!apiPromise || !abi) return asset;
          const contractPromise = new ContractPromise(
            apiPromise,
            abi,
            asset.address
          );
          const apiCaller = contractPromise.api.call.contractsApi;
          const abiMessage = toContractAbiMessage(
            contractPromise,
            "psp22::balanceOf"
          );
          try {
            const raw = await apiCaller.call<ContractExecResult>(
              xSignerSelected?.address,
              contractPromise.address,
              BN_ZERO,
              null,
              null,
              abiMessage.value.toU8a([xSignerSelected?.address || ""])
            );
            if (!raw) return asset;
            const decodedData = decodeCallResult(
              raw.result,
              abiMessage.value,
              contractPromise.abi.registry
            );
            return {
              ...asset,
              balance: decodedData.value.toString(),
            } as Asset;
          } catch {
            return asset;
          }
        })
      );

      // Set state with the updated assets
      assetRepository.saveAssetList(assetsWithBalanceUpdated);
      setData({
        token: assetsWithBalanceUpdated,
        nft: [],
      });
    }

    fetchAssets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, assetRepository, xSignerSelected]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      if (!address) {
        setLoading(false);
        return;
      }
      const existingAsset = assetRepository.getAssetByAddress(address);
      if (existingAsset) return;
      if (!checkIfExist(getName.value as string, getBalance.value as string)) {
        if (getName.ok && getBalance.ok) {
          const asset = {
            address,
            name: getName.value || "UNKNOWN",
            balance: getBalance.value || "0",
            networkId: xSignerSelected?.networkId as ChainId,
          } as Asset;
          setData((prevData) => ({
            token: [...prevData.token, asset],
            nft: prevData.nft,
          }));
          assetRepository.saveAsset(asset);
        } else {
          let error = "";
          if (!getBalance.ok && nameError) {
            error = nameError;
          } else if (!getName.ok && balanceError) {
            error = balanceError;
          }
          setError(error);
        }
      }
    };

    fetchData().finally(() => {
      setLoading(false);
    });
  }, [
    address,
    assetRepository,
    balanceError,
    checkIfExist,
    getBalance,
    getName,
    nameError,
    xSignerSelected?.networkId,
  ]);

  const listAssetByType = useCallback(
    (key: AssetType) => {
      return data[key];
    },
    [data]
  );

  return { listAssetByType, error, loading };
}

export default useFetchAssets;
