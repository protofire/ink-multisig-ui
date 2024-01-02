import HearingIcon from "@mui/icons-material/Hearing";
import { useEffect } from "react";
import { useEvents, useEventSubscription } from "useink";

import { createToast } from "@/components/AppToastNotification";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { MultisigContractEvents } from "@/domain/events/MultisigContractEvents";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

const FILTERS = Object.keys(MultisigContractEvents);

export function MultisigEventListener() {
  const { xSignerSelected } = useGetXsignerSelected();
  const { localMultisigEventRepo } = useLocalDbContext();
  const { multisigContractPromise } = useMultisigContractPromise(
    xSignerSelected?.address
  );
  useEventSubscription(multisigContractPromise);
  const { events } = useEvents(
    multisigContractPromise?.contract?.address,
    FILTERS
  );

  useEffect(() => {
    events.forEach((event) => {
      localMultisigEventRepo.createEvent(event);
      createToast(`"${event.name}" event broadcast from the Blockchain`, {
        icon: <HearingIcon />,
      });
    });
  }, [events, localMultisigEventRepo]);

  useEffect(() => {
    const processEvents = () => {
      const storedEvents = localMultisigEventRepo.getEvents();

      Object.values(storedEvents).forEach((event) => {
        // Greater than 3 seconds
        if (
          Date.now() - event.createdAt > 3000 &&
          event.name in MultisigContractEvents
        ) {
          const eventName =
            MultisigContractEvents[
              event.name as keyof typeof MultisigContractEvents
            ];
          document.dispatchEvent(new CustomEvent(eventName));
          localMultisigEventRepo.delete(event.id);
        }
      });
    };

    const interval = setInterval(processEvents, 2000);

    return () => clearInterval(interval);
  }, [localMultisigEventRepo]);

  return null;
}
