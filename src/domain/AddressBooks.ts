import { Chain } from "@/services/useink/types";

export interface AddressBook {
  address: string;
  name: string;
  networkId: Chain["id"];
}
