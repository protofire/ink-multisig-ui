import { ChainExtended, DEFAULT_CHAIN, getChain } from "@/config/chain";
import { INetworkRepository } from "@/domain/repositores/INetworkRepository";
import { ChainId } from "@/services/useink/types";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

type ReturnChainId = ChainId;

export class LocalStorageNetworkRepository implements INetworkRepository {
  private readonly storageKey = "networkSelected";

  getNetworkSelected(): ChainExtended {
    const result = getLocalStorageState<ReturnChainId | null>(
      this.storageKey,
      DEFAULT_CHAIN
    ) as ChainId;

    return getChain(result) as ChainExtended;
  }

  setNetworkSelected(networkId: ReturnChainId): void {
    setLocalStorageState(this.storageKey, networkId);
  }
}
