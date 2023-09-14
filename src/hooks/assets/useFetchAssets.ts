import { useCallback, useEffect, useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";

import { useCall } from "../useCall";

export type AssetType = "token" | "nft";

export type Asset = {
  address: string;
  name: string;
  balance: string;
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
    [accountConnected?.address || ""]
  );

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      if (!address) {
        setLoading(false);
        return;
      }

      if (!checkIfExist(getName.value as string, getBalance.value as string)) {
        if (getName.ok && getBalance.ok) {
          const asset = {
            address,
            name: getName.value || "UNKNOWN",
            balance: getBalance.value || "0",
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
    };

    fetchData().finally(() => {
      setLoading(false);
    });
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
