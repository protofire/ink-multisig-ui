import { BlockchainIssuedEvent } from "@/domain/BlockchainIssuedEvent";
import { IMultisigEventsRepository } from "@/domain/repositores/IMultisigEventsRepository";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

const getData = (storageKey: string): BlockchainIssuedEvent[] | null => {
  return getLocalStorageState<BlockchainIssuedEvent[] | null>(storageKey, null);
};

export class LocalMultisigEventsRepository
  implements IMultisigEventsRepository
{
  private storageKey = "multisigEvents";

  getEvents(): BlockchainIssuedEvent[] {
    const events = getData(this.storageKey);
    if (!events) return [];

    return events;
  }

  createEvent(event: BlockchainIssuedEvent) {
    const events = getData(this.storageKey);

    if (!events) {
      this.save([event]);
      return;
    }

    if (!this.getEvent(events, event)) {
      this.save(Object.values(events).concat(event));
    }
  }

  private save(events: BlockchainIssuedEvent[]): void {
    setLocalStorageState(this.storageKey, events);
  }

  private getEvent(
    existingEvents: BlockchainIssuedEvent[],
    newEvent: BlockchainIssuedEvent
  ): BlockchainIssuedEvent | undefined {
    return existingEvents.find((element) => element.id === newEvent.id);
  }

  delete(eventId: string): void {
    const data = getData(this.storageKey);
    if (!data) return;

    const filter = Object.values(data).filter((event) => event.id !== eventId);

    setLocalStorageState(this.storageKey, filter);
  }
}
