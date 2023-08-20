import { Chain } from "@/services/useink/types";

import { ArrayOneOrMore } from "./utilityTsTypes";

export type AddressBookList = ArrayOneOrMore<AddressBook>;

export interface AddressBook {
  address: string;
  name: string;
  networkId: Chain["id"];
}
