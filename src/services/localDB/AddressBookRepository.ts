import { AddressBook } from "@/domain/AddressBooks";
import { IAddressBookRepository } from "@/domain/repositores/IAddressBookRepository";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

const dataByNetwork = (data: AddressBook[], networkId: string) => {
  return Object.values(data).filter(
    (element) => element.networkId === networkId
  );
};

const getData = (storageKey: string): AddressBook[] | null => {
  return getLocalStorageState<AddressBook[] | null>(storageKey, null);
};

export class AddressBookRepository implements IAddressBookRepository {
  private readonly storageKey = "addressBook";

  getAddressList(networkId: string): AddressBook[] {
    const data = getData(this.storageKey);
    if (!data) return [];
    return dataByNetwork(data, networkId);
  }

  addAddress(newAddress: AddressBook | undefined): void {
    const data = getData(this.storageKey);
    if (data && newAddress) {
      this.saveAddress(Object.values(data).concat(newAddress));
    }
  }

  getItemByByAddress(accountAddress: string): AddressBook | undefined {
    const data = getData(this.storageKey);
    if (!data) return undefined;
    const filterElement = Object.values(data).find(
      (element) => element.address === accountAddress
    );
    return filterElement;
  }

  saveAddress(newData: AddressBook[]): void {
    setLocalStorageState(this.storageKey, newData);
  }

  deleteAddress(accountAddress: string): void {
    const data = getLocalStorageState<AddressBook[] | null>(
      this.storageKey,
      null
    );
    if (!data) return;
    const filter = Object.values(data).filter(
      (element) => element.address !== accountAddress
    );
    console.log("data", filter);
    setLocalStorageState(this.storageKey, filter);
  }
}
