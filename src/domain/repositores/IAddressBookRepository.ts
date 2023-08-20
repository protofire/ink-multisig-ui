import { AddressBook, AddressBookList } from "../AddressBooks";

export interface IAddressBookRepository {
  getAddressList(): AddressBookList | null;
  saveAddress(addressBook: AddressBook): void;
}
