import { useCallback, useEffect, useState } from "react";
import { useEvents, useEventSubscription, useTx } from "useink";

import { useAppNotificationContext } from "@/components/AppToastNotification/AppNotificationsContext";
import { SaveProps } from "@/components/StepperSignersAccount";
import { useTxDispatchNotification } from "@/hooks/useTxDispatchNotfication";
import { useMultisigFactoryContract } from "@/hooks/useTxMultisigFactory";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
import { generateHash } from "@/utils/blockchain";
import { customReportError } from "@/utils/error";

import { UseAddSignersAccount } from "./useAddSignersAccount";

export function useNewSignersAccount(onSave: UseAddSignersAccount["save"]) {
  const [error, setError] = useState<string | null>(null);
  const [newAccount, setNewAccount] = useState<SaveProps>();
  const { setXsigner } = useSetXsignerSelected();
  const { multisigFactoryContract } = useMultisigFactoryContract();
  const newMultisigTx = useTx(multisigFactoryContract, "newMultisig");
  const { addNotification } = useAppNotificationContext();

  useEventSubscription(multisigFactoryContract);
  const { events: multisigFactoryEvents } = useEvents(
    multisigFactoryContract?.contract.address,
    ["NewMultisig"]
  );

  useTxDispatchNotification({ tx: newMultisigTx });

  useEffect(() => {
    if (
      !multisigFactoryEvents ||
      multisigFactoryEvents.length === 0 ||
      !newAccount
    )
      return;
    const address = multisigFactoryEvents[0].args[0] as string;

    const xsignerAccount = { account: { ...newAccount, address } };
    onSave(xsignerAccount);
    setXsigner(xsignerAccount.account);
    addNotification({
      message: `Xsigner account was created successfully`,
      type: "success",
    });
  }, [addNotification, multisigFactoryEvents, newAccount, onSave, setXsigner]);

  const signAndSend = useCallback(
    (account: SaveProps) => {
      setError(null);

      const date = new Date();
      const salt = generateHash(date.toString());
      const owners = account.owners.map((o) => o.address);
      const threshold = account.threshold;

      newMultisigTx.signAndSend(
        [threshold, owners, salt],
        undefined,
        (_result, _api, _error) => {
          if (_error) {
            const errorFormated = customReportError(_error);
            setError(errorFormated);
            addNotification({ message: errorFormated, type: "error" });
          } else if (_result?.isCompleted) {
            setNewAccount(account);
          }
        }
      );
    },
    [addNotification, newMultisigTx]
  );

  return { signAndSend, error, txStatus: newMultisigTx.status };
}
