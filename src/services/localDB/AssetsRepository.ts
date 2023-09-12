import { ChainId } from "useink/dist/chains";

import {
  Asset,
  AssetData,
  IAssetsRepository,
} from "@/domain/repositores/IAssetsRepository";

export class AssetRepository implements IAssetsRepository {
  private static BASE_LOCAL_STORAGE_KEY = "assets";
  private localStorageKey: string;

  constructor(private network: ChainId | undefined) {
    this.localStorageKey = `${AssetRepository.BASE_LOCAL_STORAGE_KEY}-${network}`;
  }

  saveAsset(asset: Asset) {
    const assetData = this.getAssets();

    const existingAssetIndex = assetData.assets.findIndex(
      (a) => a.address === asset.address
    );

    if (existingAssetIndex !== -1) {
      assetData.assets[existingAssetIndex] = asset;
    } else {
      assetData.assets.push(asset);
    }

    assetData.timestamp = new Date().getTime();
    localStorage.setItem(this.localStorageKey, JSON.stringify(assetData));
  }

  getAssets(): AssetData {
    const data = localStorage.getItem(this.localStorageKey);

    if (data) {
      return JSON.parse(data);
    }

    return { assets: [], timestamp: 0 };
  }

  getAsset(address: string): { asset: Asset | undefined; timestamp: number } {
    const assetData = this.getAssets();
    return {
      asset: assetData.assets.find((a) => a.address === address),
      timestamp: new Date().getTime(),
    };
  }

  removeAsset(address: string) {
    const assetData = this.getAssets();
    assetData.assets = assetData.assets.filter((a) => a.address !== address);

    assetData.timestamp = new Date().getTime();
    localStorage.setItem(this.localStorageKey, JSON.stringify(assetData));
  }
}
