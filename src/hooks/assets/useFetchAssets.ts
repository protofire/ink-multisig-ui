import { useEffect, useState } from "react";

export type AssetType = "token" | "nft";

function useFetchAssets() {
  const [data, setData] = useState<{ token: any; nft: any } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = new Promise<{ token: any; nft: any }>((resolve, _) => {
          setTimeout(() => {
            resolve({ token: assetsData, nft: nftsData });
          }, 1000); // Simulating network latency of 1 second
        });

        const result = await response;
        setData(result);
      } catch (error: unknown) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const listAssetByType = (key: AssetType) => {
    return data ? data[key] : null;
  };

  return { data, listAssetByType, error, loading };
}

const assetsData = [
  { asset: "Polkadot token", balance: 159, value: 6.0 },
  { asset: "Polkadot token", balance: 237, value: 9.0 },
  { asset: "Polkadot token", balance: 237, value: 9.0 },
  { asset: "Polkadot token", balance: 237, value: 9.0 },
  { asset: "Polkadot token", balance: 237, value: 9.0 },
];

const nftsData = [
  { asset: "Polkadot NFT", balance: 159, value: 6.0 },
  { asset: "Polkadot NFT", balance: 237, value: 9.0 },
  { asset: "Polkadot NFT", balance: 237, value: 9.0 },
  { asset: "Polkadot NFT", balance: 237, value: 9.0 },
  { asset: "Polkadot NFT", balance: 237, value: 9.0 },
];

export default useFetchAssets;
