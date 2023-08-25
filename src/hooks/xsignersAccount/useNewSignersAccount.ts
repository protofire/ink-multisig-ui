import { useCallback, useEffect, useState } from "react";
import { useEvents, useEventSubscription, useTx } from "useink";

import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useMultisigFactoryContract } from "@/hooks/useTxMultisigFactory";

interface SaveOptions {
  onSuccess?: (account: SignatoriesAccount) => void;
  onFallback?: (error: string) => void;
}

export function useNewSignersAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { multisigFactoryContract } = useMultisigFactoryContract();
  const newMultisigTx = useTx(multisigFactoryContract, "newMultisig");
  useEventSubscription(multisigFactoryContract);
  const { events: multisigFactoryEvents } = useEvents(
    multisigFactoryContract?.contract.address,
    ["NewMultisig"]
  );

  useEffect(() => {
    if (!multisigFactoryEvents || multisigFactoryEvents.length === 0) return;
    console.log("multisigFactoryEvents", multisigFactoryEvents);
    // setActiveStep((prevActiveStep) => ({
    //   ...prevActiveStep,
    //   execution: prevActiveStep.execution + 1,
    // }));
  }, [multisigFactoryEvents]);

  // const save = useCallback(
  //   async (
  //     account: SignatoriesAccount,
  //     options?: SaveOptions
  //   ): Promise<SignatoriesAccount | void> => {
  //     setIsLoading(true);
  //     if (!multisigFactory) return;
  //     const salt = generateHash(Date.now.toString());
  //     const owners = account.owners.map((o) => o.address);

  //     try {
  //       // await multisigFactory.tx.newMultisig(account.threshold, owners, salt);

  //       // newMultisig.signAndSend(
  //       //   [account.threshold],
  //       //   undefined,
  //       //   (result, api, error) => {
  //       //     console.log("result", result, "api", api, "error", error);
  //       //   }
  //       // );

  //       return account;
  //     } catch (err) {
  //       const errorFormated = customReportError(err);
  //       setError(errorFormated);
  //       options?.onFallback?.(errorFormated);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [multisigFactory]
  // );

  const signAndSend = useCallback(
    (threshold: number, owners: string[], salt: number[]) => {
      newMultisigTx.signAndSend(
        [threshold, owners, salt],
        undefined,
        console.log
      );
    },
    [newMultisigTx]
  );

  return { signAndSend, isLoading, error, status: newMultisigTx.status };
}
