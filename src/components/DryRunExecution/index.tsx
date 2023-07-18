import { useCallback, useMemo, useState } from "react";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { AbiMessage, ContractPromise } from "@/services/substrate/types";

import { CodeBlock } from "./CodeBlock";

interface Props {
  contractPromise: ContractPromise;
  message: AbiMessage;
  params: unknown[] | undefined;
}

export function DryRunResult({ contractPromise, message, params }: Props) {
  const memoizedParams = useMemo(() => params, [params]);
  const dryRun = useGetDryRun(contractPromise, message.method);
  const [outcome, setOutcome] = useState<string>("No results yet...");

  const sendDryRun = useCallback(async () => {
    const result = await dryRun.send(memoizedParams);
    if (result?.ok) {
      setOutcome(
        `Contract call will be successful executed with ${result.value.partialFee.toString()} fee`
      );
    } else {
      setOutcome("Contract will be reverted");
    }
  }, [dryRun, memoizedParams]);

  useDebouncedEffect(sendDryRun, 300, [message, memoizedParams]);

  return (
    <CodeBlock label="Dry-run outcome">
      {dryRun.isSubmitting ? <LoadingSkeleton count={1} /> : outcome}
    </CodeBlock>
  );
}
