import { ChainExtended } from "@/config/chain";

export interface INetworkRepository {
  getNetworkSelected(): ChainExtended;
  setNetworkSelected(chainId: string): void;
}
