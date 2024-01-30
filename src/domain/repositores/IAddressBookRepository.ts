import { AddressBook } from "../AddressBooks";

export interface IAddressBookRepository {
  getAddressList(networkId?: string): AddressBook[];
  getItemByAddress(accountAddress: string): AddressBook | undefined;
  addAddress(newData: AddressBook | undefined): void;
  saveAddress(newData: AddressBook[]): void;
  deleteAddress(accountAddress: string): void;
}
