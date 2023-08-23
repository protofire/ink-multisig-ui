import { AddressBook } from "@/domain/AddressBooks";
import { IAddressBookRepository } from "@/domain/repositores/IAddressBookRepository";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

// Remove this in update
const globalData = [
  {
    address: "5FpWVjTfDzqwzzc6kPZzHQFEsfikd8JCVnEUkBcXkQKWYw8B",
    name: "Protofire Accounts",
    networkId: "astar",
  },
  {
    address: "5FWbLCgqF3VHhGPJjnTp3RwB8yW3Zf4wcLv1NMqLEEJaaMNS",
    name: "Protofire Accounts",
    networkId: "shibuya-testnet",
  },
  {
    address: "5HGoxwXf22nczY4gWJRmo1NACNWTFFQSF3wsZvm2UpJx2Fpx",
    name: "Protofire Accounts",
    networkId: "astar",
  },
  {
    address: "5DArcAaciV7pV8ymGMa6d1Nw65BpWbkG1B5qAvFFLii4gFE6",
    name: "Protofire Accounts",
    networkId: "shibuya-testnet",
  },
];

export class AddressBookRepository implements IAddressBookRepository {
  private readonly storageKey = "addressBook";

  getAddressList(networkId: string): AddressBook[] | null {
    // Remove this default LocalStorage Values
    setLocalStorageState("addressBook", globalData);
    //
    const result = getLocalStorageState<AddressBook[]>(
      this.storageKey,
      null as unknown as AddressBook[]
    );
    const data = Object.values(result as unknown as AddressBook[]).filter(
      (element) => element.networkId === networkId
    );
    return data as AddressBook[];
  }

  saveAddress(account: AddressBook): void {
    setLocalStorageState(this.storageKey, account);
  }
}
