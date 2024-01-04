import { useCallback, useMemo, useState } from "react";

import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import {
  AbiMessage,
  ContractPromise,
  Registry,
  WeightV2,
} from "@/services/substrate/types";
import { getIfSpecialError } from "@/services/substrate/utils/specialErrorWrapper";

interface UseDryRunExecutionProps {
  contractPromise: ContractPromise;
  message: AbiMessage | undefined;
  params: unknown[] | undefined;
  autoRun?: boolean;
  substrateRegistry: Registry;
  addressCaller?: string;
}

export interface DryRunExecutionResult {
  outcome: string | undefined;
  error: string | undefined;
  isRunning: boolean;
  executeDryRun: () => void;
  gasRequired: WeightV2 | undefined;
}

export function useDryRunExecution({
  contractPromise,
  message,
  params,
  autoRun = false,
  substrateRegistry,
  addressCaller,
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
  const [gasRequired, setGasRequired] = useState<WeightV2>();

  const executeDryRun = useCallback(async () => {
    setOutcome(undefined);
    setError(undefined);

    const result = await dryRun.send(memoizedParams);
    if (result?.ok) {
      throw new Error(
        result?.error.toString() ?? "Error executing the dry running."
      );

      // setGasRequired(result.value.gasRequired);
      // const { decodedOutput, isError } =
      //   (message &&
      //     getDecodedOutput(
      //       {
      //         debugMessage: result.value.raw.debugMessage,
      //         result: result.value.raw.result,
      //       },
      //       message,
      //       substrateRegistry
      //     )) ||
      //   {};
      if (isError) {
        setOutcome("Transaction will be reverted");
        setError(decodedOutput);
      } else {
        setOutcome("Transaction will be executed");
      }
    } else {
      const error = result.error?.name
        ? getIfSpecialError(result.error?.name)
        : "Transaction will be reverted due to unknown error";

      setError(error);
      setOutcome("Transaction will be reverted");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dryRun, message, substrateRegistry]);

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
    gasRequired,
  };
}
