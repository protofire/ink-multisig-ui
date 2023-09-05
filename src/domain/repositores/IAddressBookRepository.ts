import { AddressBook } from "../AddressBooks";

export interface IAddressBookRepository {
  getAddressList(networkId: string): AddressBook[];
  getItemByByAddress(accountAddress: string): AddressBook | undefined;
  addAddress(newData: AddressBook | undefined): void;
  saveAddress(newData: AddressBook[]): void;
  deleteAddress(accountAddress: string): void;
}
