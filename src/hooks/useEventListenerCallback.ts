import { useEffect, useRef } from "react";

import { IS_DEVELOPMENT } from "@/config/app";
import { AddressBookEvents } from "@/domain/events/AddressBookEvents";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";

type EventCallback = () => void;
type EventNames =
  | keyof typeof AddressBookEvents
  | keyof typeof WalletConnectionEvents;

export function useEventListenerCallback(
  events: EventNames[] | EventNames, // accept any array of strings as event names
  callback: EventCallback
): void {
  const callbackRef = useRef<EventCallback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleEvent = (event: Event) => {
      if (IS_DEVELOPMENT) {
        console.info("Received event::", event.type);
      }
      callback();
    };

    const _events = Array.isArray(events) ? events : [events];

    _events.forEach((eventName) => {
      document.addEventListener(eventName, handleEvent);
    });

    return () => {
      _events.forEach((eventName) => {
        document.removeEventListener(eventName, handleEvent);
      });
    };
  }, [events, callback]);
}
