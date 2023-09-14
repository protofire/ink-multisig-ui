import { useCallback, useEffect, useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";

import { useCall } from "../useCall";

export type AssetType = "token" | "nft";

export type Asset = {
  address: string;
  name: string;
  balance: number;
};

const DEFAULT_DATA = {
  token: [],
  nft: [],
};

function useFetchAssets(address: string) {
  const [data, setData] = useState<{ token: Asset[]; nft: any[] }>(
    DEFAULT_DATA
  );
  const { accountConnected } = usePolkadotContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkIfExist = useCallback(
    (address: string) => {
      return data.token.some((item) => item.address === address);
    },
    [data.token]
  );

  const {
    data: getName,
    error: nameError,
    reset: resetName,
  } = useCall(address, "psp22Metadata::tokenName");
  const {
    data: getBalance,
    error: balanceError,
    reset: resetBalance,
  } = useCall(address, "psp22::balanceOf", [accountConnected?.address || ""]);

  useEffect(() => {
    if (!address) return;
    resetName();
    resetBalance();
  }, [address, resetBalance, resetName]);

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }
    if (!checkIfExist(address)) {
      if (getName.ok && getBalance.ok) {
        const asset = {
          address,
          name: getName.value || "UNKNOWN",
          balance: getBalance.value || 0,
        } as Asset;
        setData((prevData) => ({
          token: [...prevData.token, asset],
          nft: prevData.nft,
        }));
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
    setLoading(false);
  }, [address, balanceError, checkIfExist, getBalance, getName, nameError]);

  const listAssetByType = useCallback(
    (key: AssetType) => {
      return data[key];
    },
    [data]
  );

  return { listAssetByType, error, loading };
}

export default useFetchAssets;
