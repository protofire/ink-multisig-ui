import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tx } from "useink";

interface UseTxDispatchNotification {
  tx: Tx<unknown>;
  title?: string;
}

export function useTxDispatchNotification({
  tx,
  title,
}: UseTxDispatchNotification) {
  const msgPrefix = title ? `${title} transaction` : "Transaction";
  const [idToast, setIdToast] = useState<string | number>(0);

  useEffect(() => {
    if (!idToast && tx.status === "PendingSignature") {
      const id = toast.loading(`${msgPrefix} waiting for signature...`);
      setIdToast(id);
    }
    if (idToast && tx.status === "None") {
      // TODO, check this case
      toast.update(idToast, {
        render: `The ${msgPrefix} was gone`,
        type: "info",
        isLoading: false,
        autoClose: 500,
      });
      setIdToast(0);
    }
    if (idToast && tx.status === "Broadcast") {
      toast.update(idToast, {
        render: `The ${msgPrefix} will be proccessed in a block`,
        type: "info",
        isLoading: true,
      });
    }
    if (idToast && tx.status === "InBlock") {
      toast.update(idToast, {
        render: `The ${msgPrefix} was proccessed`,
        type: "info",
        isLoading: false,
        autoClose: 1000,
      });
      setIdToast(0);
    }
  }, [idToast, msgPrefix, tx.status]);
  return null;
}
