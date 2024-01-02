import { BlockchainIssuedEvent } from "@/domain/BlockchainIssuedEvent";

export interface IMultisigEventsRepository {
  getEvents(): BlockchainIssuedEvent[];
  createEvent(event: BlockchainIssuedEvent): void;
  delete(eventId: string): void;
}
