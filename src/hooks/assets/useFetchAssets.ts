import { useCallback, useEffect, useRef, useState } from "react";
import { Call } from "useink";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
import { decodeError } from "useink/core";

import { usePolkadotContext } from "@/context/usePolkadotContext";

import { usePSPTx } from "../usePSPTx";

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

  const { tx: getValue, contract } = usePSPTx({
    address,
    method: "psp22::balanceOf",
    params: [accountConnected?.address || ""],
  });

  const { tx: getName } = usePSPTx({
    address,
    method: "psp22Metadata::tokenName",
  });

  const previousValueRef = useRef<{
    balance: unknown | undefined;
    name: unknown | undefined;
  }>({ balance: {}, name: {} });

  useEffect(() => {
    const balance = (getValue as Omit<Call<unknown>, "send">).result;
    const name = (getName as Omit<Call<unknown>, "send">).result;
    if (
      JSON.stringify(previousValueRef.current.balance) !==
        JSON.stringify(balance) ||
      JSON.stringify(previousValueRef.current.name) !== JSON.stringify(name)
    ) {
      if (balance?.ok && name?.ok) {
        const asset = {
          address,
          name: name?.value.decoded || "UNKNOWN",
          balance: balance?.value.decoded || 0,
        } as Asset;

        setData((prevData) => ({
          token: [...prevData.token, asset],
          nft: prevData.nft,
        }));
      } else {
        let error = "";
        if (!balance?.ok && balance?.error) {
          error = decodeError(balance.error, contract);
        } else if (!name?.ok && name?.error) {
          error = decodeError(name.error, contract);
        }
        setError(error);
      }

      previousValueRef.current = { balance, name };
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValue.result, getName.result, address]);

  const listAssetByType = useCallback(
    (key: AssetType) => {
      return data[key];
    },
    [data]
  );

  return { listAssetByType, error, loading };
}

export default useFetchAssets;
