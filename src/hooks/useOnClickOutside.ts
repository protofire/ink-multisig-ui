import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent | KeyboardEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  keys?: string[]
): void => {
  useEffect(() => {
    const listener = (event: Event): void => {
      // Manage key events
      if (event.type === "keydown") {
        const keyEvent = event as KeyboardEvent;
        // If no keys are provided, or if pressed key is in the array, call the handler
        if (!keys || keys.includes(keyEvent.key)) {
          handler(event);
          return;
        }
      }

      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keydown", listener, true);

    return (): void => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keydown", listener, true);
    };
  }, [ref, handler, keys]); // Reload only if ref or handler changes
};

export default useOnClickOutside;
