import { useCallback, useMemo, useState } from "react";

import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import {
  AbiMessage,
  ContractPromise,
  Registry,
} from "@/services/substrate/types";
import { getDecodedOutput } from "@/services/substrate/utils/contractExecResult";

interface UseDryRunExecutionProps {
  contractPromise: ContractPromise;
  message: AbiMessage;
  params: unknown[] | undefined;
  autoRun: boolean;
  substrateRegistry: Registry;
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
  substrateRegistry,
}: UseDryRunExecutionProps): DryRunExecutionResult {
  const { xSignerSelected } = useGetXsignerSelected();
  const dryRun = useGetDryRun(
    contractPromise,
    message.method,
    xSignerSelected?.address || undefined
  );
  const [outcome, setOutcome] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const memoizedParams = useMemo(() => params, [params]);

  const executeDryRun = useCallback(async () => {
    setOutcome(undefined);
    setError(undefined);

    const result = await dryRun.send(memoizedParams);
    if (result?.ok) {
      const { decodedOutput, isError } = getDecodedOutput(
        {
          debugMessage: result.value.raw.debugMessage,
          result: result.value.raw.result,
        },
        message,
        substrateRegistry
      );
      if (isError) {
        setOutcome("Transaction will be reverted");
        setError(decodedOutput);
      } else {
        setOutcome("Transaction will be executed");
      }
    } else {
      setError("Transaction will be reverted");
      setOutcome("Transaction will be reverted");
    }
  }, [dryRun, memoizedParams, message, substrateRegistry]);

  useDebouncedEffect({
    effect: executeDryRun,
    delay: 100,
    deps: [message, memoizedParams],
    autoRun: autoRun,
  });

  return {
    outcome,
    error,
    isRunning: dryRun.isSubmitting,
    executeDryRun,
  };
}
