import { useCallback, useMemo, useState } from "react";

import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { AbiMessage, ContractPromise } from "@/services/substrate/types";
import { getIfSpecialError } from "@/services/substrate/utils/specialErrorWrapper";
import { customReportError } from "@/utils/error";

interface UseDryRunExecutionProps {
  contractPromise: ContractPromise;
  message: AbiMessage | undefined;
  params: unknown[] | undefined;
  autoRun?: boolean;
  addressCaller?: string;
  successOutcome?: string;
  failureOutcome?: string;
}

export interface DryRunExecutionResult {
  outcome: string | undefined;
  error: string | undefined;
  isRunning: boolean;
  executeDryRun: () => void;
}

export function useDryRunExecution({
  contractPromise,
  message,
  params,
  autoRun = false,
  addressCaller,
  successOutcome = "Transaction will be executed",
  failureOutcome = "Transaction will be reverted",
}: UseDryRunExecutionProps): DryRunExecutionResult {
  const { xSignerSelected } = useGetXsignerSelected();
  const dryRun = useGetDryRun(
    contractPromise,
    message?.method || "",
    addressCaller ? addressCaller : xSignerSelected?.address || undefined
  );
  const [outcome, setOutcome] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const memoizedParams = useMemo(() => params, [params]);

  const executeDryRun = useCallback(async () => {
    setOutcome(undefined);
    setError(undefined);

    try {
      const dryRunResult = await dryRun.send(memoizedParams);
      if (!dryRunResult?.ok) {
        const error = dryRunResult.error?.name
          ? getIfSpecialError(dryRunResult.error?.name)
          : "Transaction will be reverted due to unknown error";

        setError(error);
        setOutcome(failureOutcome);
      } else if (dryRunResult.value.decoded?.Err) {
        setOutcome(failureOutcome);
        setError(dryRunResult.value.decoded?.Err);
      } else {
        setOutcome(successOutcome);
      }
    } catch (e) {
      const errorFormatted = customReportError(e);
      setError(errorFormatted);
      setOutcome(failureOutcome);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dryRun, failureOutcome, memoizedParams, successOutcome, message]);

  useDebouncedEffect({
    effect: executeDryRun,
    delay: 100,
    deps: [message, memoizedParams, addressCaller],
    autoRun: autoRun,
  });

  return {
    outcome,
    error,
    isRunning: dryRun.isSubmitting,
    executeDryRun,
  };
}
