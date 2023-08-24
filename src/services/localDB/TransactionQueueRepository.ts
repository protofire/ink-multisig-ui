import { AddressBook } from "@/domain/AddressBooks";
import { ITransactionQueueRepository } from "@/domain/repositores/ITransactionQueueRepository";
import { TransactionQueue } from "@/domain/TransactionQueue";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

// Remove this in update
const globalData = [
  {
    address: "5FWbLCgqF3VHhGPJjnTp3RwB8yW3Zf4wcLv1NMqLEEJaaMNS",
    type: "Send",
    value: "300",
    token: "ROC",
    txValidation: "1",
  },
  {
    address: "5FWbLCgqF3VHhGPJjnTp3RwB8yW3Zf4wcLv1NMqLEEJaaMNS",
    type: "Receive",
    value: "300",
    token: "ROC",
    txValidation: "1",
  },
  {
    address: "5FWbLCgqF3VHhGPJjnTp3RwB8yW3Zf4wcLv1NMqLEEJaaMNS",
    type: "Send",
    value: "300",
    token: "ROC",
    txValidation: "1",
  },
  {
    address: "5FWbLCgqF3VHhGPJjnTp3RwB8yW3Zf4wcLv1NMqLEEJaaMNS",
    type: "Receive",
    value: "300",
    token: "ROC",
    txValidation: "1",
  },
];

export class TransactionQueueRepository implements ITransactionQueueRepository {
  private readonly storageKey = "transactionQueue";

  getQueue(address: string): TransactionQueue[] | null {
    // Remove this default LocalStorage Values
    setLocalStorageState("transactionQueue", globalData);
    //
    const result = getLocalStorageState<TransactionQueue[]>(
      this.storageKey,
      null as unknown as TransactionQueue[]
    );
    const data = Object.values(result as unknown as TransactionQueue[]).filter(
      (element) => element.address === address
    );
    return data as TransactionQueue[];
  }

  saveAddress(account: AddressBook): void {
    setLocalStorageState(this.storageKey, account);
  }
}
