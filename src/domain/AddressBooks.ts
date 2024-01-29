import { Chain } from "@/services/useink/types";

export interface AddressBook {
  address: string;
  name: string;
  networkId: Chain["id"];
}

export interface AddressBookItemUi extends AddressBook {
  formattedAddress: string;
}

export type AddressBookInput = AddressBookItemUi & {
  isEditing: boolean;
};
