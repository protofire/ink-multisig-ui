import { ArrayOneOrMore } from "useink/dist/core";

import { Chain } from "@/services/useink/types";

export interface SignatoriesAccount {
  address: string;
  networkId: Chain["id"];
  threshold: ArrayOneOrMore<string>;
}
