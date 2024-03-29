import { ArrayOneOrMore } from "@/domain/utilityTsTypes";
// Astar and Shiden will be disabled until we deploy the contract for this parachanins
// import { Astar, ShidenKusama } from "@/services/useink/chains/chaindata";
import {
  RococoContractsTestnet,
  ShibuyaTestnet,
} from "@/services/useink/chains/testnet-chaindata";
import { Chain, ChainId } from "@/services/useink/types";

import { CHAINS_IMG_PATH } from "./images";

export const DEFAULT_CHAIN: Chain["id"] = "shibuya-testnet";

export type ChainExtended = Chain & {
  id: ChainId;
  token: string;
  logo: {
    src: string;
    alt: string;
  };
};

export const CHAINS: ArrayOneOrMore<Chain> = [
  ShibuyaTestnet,
  // Astar,
  // ShidenKusama,
];

export const CHAINS_TOKENS = {
  [ShibuyaTestnet.id]: "SBY",
};

export const CHAINS_ALLOWED: ChainExtended[] = CHAINS.map((chain) => {
  return {
    ...chain,
    token: CHAINS_TOKENS[chain.id as keyof typeof CHAINS_TOKENS],
    logo: {
      src: `${CHAINS_IMG_PATH}${chain.id ? chain.id : "custom"}.png`,
      alt: `${chain.name} img`,
    },
  };
});

export type ChainColors = {
  [key in ChainId]?: string;
};

export const CHAINS_COLORS: ChainColors = {
  [RococoContractsTestnet.id]: "#8453c2",
  [ShibuyaTestnet.id]: "#FF9F1C",
};

const UNKNOWN_CHAIN = {
  name: "UNKNOWN",
  id: "unknown-network",
  logo: {
    src: `${CHAINS_IMG_PATH}custom.png`,
    alt: `unknown chain img`,
  },
};

export const getChain = (chainId?: ChainId): ChainExtended => {
  if (!chainId) return UNKNOWN_CHAIN as ChainExtended;
  return (CHAINS_ALLOWED.find((_chain) => _chain.id === chainId) ??
    UNKNOWN_CHAIN) as ChainExtended;
};
