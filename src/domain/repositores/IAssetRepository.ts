import { Asset } from "@/hooks/assets/useFetchAssets";

export interface IAssetRepository {
  getAssetList(networkId: string): Asset[];
  getAssetByAddress(accountAddress: string): Asset | undefined;
  saveAsset(asset: Asset): void;
  saveAssetList(assetList: Asset[]): void;
}
