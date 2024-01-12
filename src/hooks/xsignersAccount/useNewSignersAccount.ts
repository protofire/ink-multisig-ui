import { ContractPromise } from "@polkadot/api-contract";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEvents, useEventSubscription, useTx } from "useink";

import { useAppNotificationContext } from "@/components/AppToastNotification/AppNotificationsContext";
import { SaveProps } from "@/components/StepperSignersAccount";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { XsignerAccountEvents } from "@/domain/events/XsignerAccountEvents";
import { useMultisigFactoryContract } from "@/hooks/contractPromise/useTxMultisigFactory";
import { useTxDispatchNotification } from "@/hooks/useTxDispatchNotfication";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
import { generateHash } from "@/utils/blockchain";
import { customReportError } from "@/utils/error";

import { useDryRunExecution } from "../useDryRunExecution";
import { UseAddSignersAccount } from "./useAddSignersAccount";

export function useNewSignersAccount(onSave: UseAddSignersAccount["save"]) {
  const [error, setError] = useState<string | null>(null);
  const [newAccount, setNewAccount] = useState<SaveProps>();
  const { setXsigner } = useSetXsignerSelected();
  const { multisigFactoryContract } = useMultisigFactoryContract();
  const newMultisigTx = useTx(multisigFactoryContract, "newMultisig");
  const { addNotification } = useAppNotificationContext();
  const { accountConnected } = usePolkadotContext();
  const [params, setParams] = useState<unknown[]>([]);
  const {
    executeDryRun,
    error: dryRunError,
    outcome,
  } = useDryRunExecution({
    contractPromise: multisigFactoryContract?.contract as ContractPromise,
    message: multisigFactoryContract?.contract.abi.findMessage("newMultisig"),
    params,
    addressCaller: accountConnected?.address,
  });
  const dryRunExecuted = useRef(false);

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

  useEffect(() => {
    if (params.length) {
      executeDryRun();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.length]);

  useEffect(() => {
    if (dryRunError && dryRunExecuted.current) {
      addNotification({ message: dryRunError, type: "error" });
      setError(dryRunError);
      setNewAccount(undefined);
      setParams([]);
      return;
    }

    if (outcome && !dryRunError) {
      dryRunExecuted.current = false;
      const [threshold, owners, salt] = params;
      newMultisigTx.signAndSend(
        [threshold, owners, salt],
        undefined,
        (_result, _api, _error) => {
          if (_error) {
            const errorFormated = customReportError(_error);
            setError(errorFormated);
            addNotification({ message: errorFormated, type: "error" });
            setNewAccount(undefined);
          } else if (_result?.isCompleted) {
            document.dispatchEvent(
              new CustomEvent(XsignerAccountEvents.accountCreated)
            );
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNotification, dryRunError, outcome]);

  const signAndSend = useCallback(
    (account: SaveProps) => {
      setError(null);
      const date = new Date();
      const salt = generateHash(date.toString());
      const owners = account.owners.map((o) => o.address);
      const threshold = account.threshold;
      dryRunExecuted.current = true;
      setParams([threshold, owners, salt]);
      setNewAccount(account);
    },
    [setParams]
  );

  return {
    signAndSend,
    error,
    txStatus: newMultisigTx.status,
    reset: newMultisigTx.resetState,
  };
}
