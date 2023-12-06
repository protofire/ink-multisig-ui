import { IAssetRepository } from "@/domain/repositores/IAssetRepository";
import { Asset } from "@/hooks/assets/useFetchAssets";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

const dataByNetwork = (data: Asset[], networkId: string) => {
  return Object.values(data).filter(
    (element) => element.networkId === networkId
  );
};

const getData = (storageKey: string): Asset[] | null => {
  return getLocalStorageState<Asset[] | null>(storageKey, null);
};

export class AssetRepository implements IAssetRepository {
  private readonly storageKey = "assets";

  getAssetList(networkId: string): Asset[] {
    const data = getData(this.storageKey);
    if (!data) return [];
    return dataByNetwork(data, networkId);
  }

  getAssetByAddress(accountAddress: string): Asset | undefined {
    const data = getData(this.storageKey);
    if (!data) return undefined;
    const filterElement = Object.values(data).find(
      (element) => element.address === accountAddress
    );
    return filterElement as Asset;
  }

  saveAsset(asset: Asset): void {
    const data = getData(this.storageKey) as Asset[];
    if (!data) {
      setLocalStorageState(this.storageKey, [asset]);
      return;
    }
    setLocalStorageState(this.storageKey, Object.values(data).concat(asset));
  }

  saveAssetList(assetList: Asset[]): void {
    setLocalStorageState(this.storageKey, assetList);
  }
}
