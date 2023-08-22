import { AddressBook, AddressBookList } from "../AddressBooks";

export interface IAddressBookRepository {
  getAddressList(networkId: string): AddressBookList | null;
  saveAddress(addressBook: AddressBook): void;
}
