import { AddressBook } from "@/domain/AddressBooks";
import { IAddressBookRepository } from "@/domain/repositores/IAddressBookRepository";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

export class AddressBookRepository implements IAddressBookRepository {
  private readonly storageKey = "addressBook";

  getAddressList(networkId: string): AddressBook[] {
    const result = getLocalStorageState<AddressBook[]>(
      this.storageKey,
      null as unknown as AddressBook[]
    );

    if (!result) return [];

    const data = Object.values(result as unknown as AddressBook[]).filter(
      (element) => element.networkId === networkId
    );
    return data;
  }

  saveAddress(account: AddressBook): void {
    setLocalStorageState(this.storageKey, account);
  }
}
