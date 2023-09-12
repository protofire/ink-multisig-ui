export type Asset = {
  name: string;
  balance: number;
  value: number;
  address: string;
};

export type AssetData = {
  assets: Asset[];
  timestamp: number;
};

export interface IAssetsRepository {
  saveAsset(asset: Asset): void;
  getAssets(): AssetData;
  getAsset(address: string): { asset: Asset | undefined; timestamp: number };
  removeAsset(address: string): void;
}
