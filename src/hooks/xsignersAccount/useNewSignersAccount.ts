import { useCallback, useEffect, useState } from "react";
import { useEvents, useEventSubscription, useTx } from "useink";

import { SaveProps } from "@/components/StepperSignersAccount";
import { useMultisigFactoryContract } from "@/hooks/useTxMultisigFactory";
import { generateHash } from "@/utils/blockchain";
import { customReportError } from "@/utils/error";

import { UseAddSignersAccount } from "./useAddSignersAccount";

export function useNewSignersAccount(onSave: UseAddSignersAccount["save"]) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newAccount, setNewAccount] = useState<SaveProps>();

  const { multisigFactoryContract } = useMultisigFactoryContract();
  const newMultisigTx = useTx(multisigFactoryContract, "newMultisig");
  useEventSubscription(multisigFactoryContract);
  const { events: multisigFactoryEvents } = useEvents(
    multisigFactoryContract?.contract.address,
    ["NewMultisig"]
  );

  useEffect(() => {
    if (
      !multisigFactoryEvents ||
      multisigFactoryEvents.length === 0 ||
      !newAccount
    )
      return;
    const address = multisigFactoryEvents[0].args[0] as string;

    onSave({ account: { ...newAccount, address } });
  }, [multisigFactoryEvents, newAccount, onSave]);

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
          } else if (_result?.isCompleted) {
            setNewAccount(account);
          }
        }
      );
    },
    [newMultisigTx]
  );

  return { signAndSend, isLoading, error, txStatus: newMultisigTx.status };
}
