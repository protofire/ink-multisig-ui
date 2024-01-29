import { ArrayOneOrMore } from "useink/dist/core";

import { Chain } from "@/services/useink/types";

export type Owner = {
  address: string;
  name: string;
};

export type CrossOwnerWithAddressBook = {
  address: string;
  name: string;
  inAddressBook: boolean;
};

export interface SignatoriesAccount<
  T extends Owner | CrossOwnerWithAddressBook = Owner
> {
  address: string;
  name: string;
  networkId: Chain["id"];
  owners: ArrayOneOrMore<T>;
  threshold: number;
}
