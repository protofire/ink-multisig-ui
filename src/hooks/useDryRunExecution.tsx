import { useCallback, useMemo, useState } from "react";

import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { AbiMessage, ContractPromise } from "@/services/substrate/types";
import { getIfSpecialError } from "@/services/substrate/utils/specialErrorWrapper";
import { DryRun } from "@/services/useink/hooks/useDryRun";
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

export async function parseDryRunData(
  dryRunInstance: DryRun<unknown>,
  data: unknown[] | undefined,
  failureOutcome: string,
  successOutcome: string
) {
  let outcome, error, gasRequired;
  try {
    const dryRunResult = await dryRunInstance.send(data);
    if (!dryRunResult?.ok) {
      const parsedError = dryRunResult.error?.name
        ? getIfSpecialError(dryRunResult.error?.name)
        : "Transaction will be reverted due to unknown error";

      error = parsedError;
      outcome = failureOutcome;
    } else if (dryRunResult.value.decoded?.Err) {
      outcome = failureOutcome;
      error = dryRunResult.value.decoded?.Err;
    } else {
      outcome = successOutcome;
      gasRequired = dryRunResult.value.gasRequired;
    }
  } catch (e) {
    const errorFormatted = customReportError(e);
    error = errorFormatted;
    outcome = failureOutcome;
  }
  return { outcome, error, gasRequired };
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
    setError(undefined);
    setOutcome(undefined);
    const { outcome, error } = await parseDryRunData(
      dryRun,
      memoizedParams,
      failureOutcome,
      successOutcome
    );
    setOutcome(outcome);
    setError(error);
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
