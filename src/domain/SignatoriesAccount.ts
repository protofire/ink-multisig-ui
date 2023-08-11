import { ArrayOneOrMore } from "useink/dist/core";

import { Chain } from "@/services/useink/types";

export type Owner = {
  address: string;
  name: string;
};

export interface SignatoriesAccount {
  address: string;
  name: string;
  networkId: Chain["id"];
  owners: ArrayOneOrMore<Owner>;
  threshold: number;
}
