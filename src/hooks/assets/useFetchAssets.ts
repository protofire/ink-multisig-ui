import { ContractPromise } from "@polkadot/api-contract";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Call, ChainContract } from "useink";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
import { decodeError } from "useink/core";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Asset } from "@/domain/repositores/IAssetsRepository";
import { AssetRepository } from "@/services/localDB/AssetsRepository";

import { usePSPTx } from "../usePSPTx";

export type AssetType = "token" | "nft";

const DEFAULT_DATA = {
  token: [],
  nft: [],
};

const FIVE_MINUTES = 5 * 60 * 1000;

function useFetchAssets(address: string) {
  const [data, setData] = useState<{ token: Asset[]; nft: any[] }>(
    DEFAULT_DATA
  );
  const { accountConnected, network } = usePolkadotContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const assetRepository = useMemo(
    () => new AssetRepository(network),
    [network]
  );

  const { tx: getValue, contract } = usePSPTx({
    address,
    method: "psp22::balanceOf",
  }) as { tx: Call<unknown>; contract: ChainContract<ContractPromise> };

  const { tx: getName } = usePSPTx({
    address,
    method: "psp22Metadata::tokenName",
  }) as { tx: Call<unknown>; contract: ChainContract<ContractPromise> };

  useEffect(() => {
    const balance = getValue.result;
    const name = getName.result;

    if (balance?.ok && name?.ok) {
      const asset = {
        address,
        name: name?.value.decoded || "UNKNOWN",
        balance: balance?.value.decoded || 0,
        value: 0,
      } as Asset;

      setData((prevData) => ({
        token: [...prevData.token, asset],
        nft: prevData.nft,
      }));
      assetRepository.saveAsset(asset);
    } else {
      let error = "";
      if (!balance?.ok && balance?.error) {
        error = decodeError(balance.error, contract);
      } else if (!name?.ok && name?.error) {
        error = decodeError(name.error, contract);
      }
      setError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValue.result, getName.result, address]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const currentTime = new Date().getTime();

      const { asset: assetData, timestamp: lastFetchTime } =
        assetRepository.getAsset(address);
      if (assetData && currentTime - lastFetchTime < FIVE_MINUTES) {
        const { assets } = assetRepository.getAssets();
        setData({ token: assets, nft: [] });
      } else {
        if (assetData) {
          assetRepository.removeAsset(address);
        }

        getValue.send([accountConnected?.address || ""]);
        getName.send([]);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetRepository, address, accountConnected?.address]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const listAssetByType = useCallback(
    (key: AssetType) => {
      return data[key];
    },
    [data]
  );

  return { listAssetByType, error, loading };
}

export default useFetchAssets;
