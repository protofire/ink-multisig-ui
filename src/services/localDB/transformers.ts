import { AddressBookItemUi } from "@/domain/AddressBooks";

export function addressBookToAddressBookInput(addressBook: AddressBookItemUi) {
  return {
    ...addressBook,
    isEditing: false,
  };
}
