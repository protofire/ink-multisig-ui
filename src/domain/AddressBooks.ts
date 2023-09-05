import { Chain } from "@/services/useink/types";

export interface AddressBook {
  address: string;
  name: string;
  networkId: Chain["id"];
  isEditable: boolean;
}

export const defaultValues: AddressBook = {
  address: "default-address",
  name: "default-name",
  networkId: "astar",
  isEditable: false,
};
