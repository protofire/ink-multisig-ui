import { Chain } from "useink/dist/chains";

import { ArrayOneOrMore } from "@/domain/utilityTsTypes";
import { RococoContractsTestnet } from "@/services/substrate/InterfaceChain";

export const CHAINS_ALLOWED: ArrayOneOrMore<Chain> = [RococoContractsTestnet];
