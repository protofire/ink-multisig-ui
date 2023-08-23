import { AddressBook } from "../AddressBooks";

export interface IAddressBookRepository {
  getAddressList(networkId: string): AddressBook[] | null;
  saveAddress(addressBook: AddressBook): void;
}
