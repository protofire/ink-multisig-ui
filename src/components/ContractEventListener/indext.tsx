import { useEvents, useEventSubscription } from "useink";

import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

export function ContractEventListener() {
  const { xSignerSelected } = useGetXsignerSelected();
  const { multisigContractPromise } = useMultisigContractPromise(
    xSignerSelected?.address
  );
  useEventSubscription(multisigContractPromise);
  const { events } = useEvents(multisigContractPromise?.contract?.address);

  console.log("__Events", events);

  return null;
}
