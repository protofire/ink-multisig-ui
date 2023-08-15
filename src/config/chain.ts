import { ArrayOneOrMore } from "@/domain/utilityTsTypes";
import { Astar, ShidenKusama } from "@/services/useink/chains/chaindata";
import {
  RococoContractsTestnet,
  ShibuyaTestnet,
} from "@/services/useink/chains/testnet-chaindata";
import { Chain } from "@/services/useink/types";

import { CHAINS_IMG_PATH } from "./images";

export type ChainExtended = Chain & {
  logo: {
    src: string;
    alt: string;
  };
};

export const CHAINS: ArrayOneOrMore<Chain> = [
  RococoContractsTestnet,
  ShibuyaTestnet,
  Astar,
  ShidenKusama,
];

export const CHAINS_ALLOWED: ChainExtended[] = CHAINS.map((chain) => {
  return {
    ...chain,
    logo: {
      src: `${CHAINS_IMG_PATH}${chain.id}.png`,
      alt: `${chain.name} img`,
    },
  };
});

export type ChainColors = {
  [key in (typeof CHAINS_ALLOWED)[number]["id"]]?: string;
};

export const CHAINS_COLORS: ChainColors = {
  [RococoContractsTestnet.id]: "#8453c2",
  [ShibuyaTestnet.id]: "#FF9F1C",
};

export function getChain(chainId: (typeof CHAINS_ALLOWED)[number]["id"]) {
  return CHAINS_ALLOWED.find((_chain) => _chain.id === chainId);
}
