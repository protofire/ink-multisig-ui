import { TransactionQueue } from "../TransactionQueue";

export interface ITransactionQueueRepository {
  getQueue(networkId: string): TransactionQueue[] | null;
}
