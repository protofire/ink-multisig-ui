import { useMemo, useState } from "react";
import {
  ChainContract,
  useAbiMessage,
  useDefaultCaller,
  useWallet,
} from "useink";
import {
  call,
  DecodedTxResult,
  LazyCallOptions,
  toContractOptions,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
} from "useink/core";

export type DryRunResult<T> = DecodedTxResult<T>;

export type Send<T> = (
  args?: unknown[],
  o?: LazyCallOptions
) => Promise<DryRunResult<T> | undefined>;

export interface DryRun<T> {
  send: Send<T>;
  isSubmitting: boolean;
  result?: DryRunResult<T>;
  resolved: boolean;
  resetState: () => void;
}

export function useDryRun<T>(
  chainContract: ChainContract | undefined,
  message: string,
  customCaller?: string
): DryRun<T> {
  const { account } = useWallet();
  const defaultCaller = useDefaultCaller(chainContract?.chainId);
  const [result, setResult] = useState<DecodedTxResult<T>>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const abiMessage = useAbiMessage(chainContract?.contract, message);

  const send: Send<T> = useMemo(
    () => async (params, options) => {
      const tx = chainContract?.contract?.tx?.[message];
      let caller = account?.address
        ? account.address
        : options?.defaultCaller
        ? defaultCaller
        : undefined;

      if (customCaller) caller = customCaller;

      if (!caller || !chainContract?.contract || !abiMessage || !tx) {
        return;
      }

      console.log("__Caller", caller);
      setIsSubmitting(true);

      try {
        const resp = await call<T>(
          chainContract.contract,
          abiMessage,
          caller,
          params,
          options
        );

        if (!resp || !resp.ok) return;

        const { gasConsumed, gasRequired, storageDeposit } = resp.value.raw;

        const requiresNoArguments = tx.meta.args.length === 0;
        const { partialFee } = await (requiresNoArguments
          ? tx(toContractOptions(options))
          : tx(toContractOptions(options), ...(params || []))
        ).paymentInfo(caller);

        const r = {
          ...resp,
          value: {
            ...resp.value,
            gasRequired,
            gasConsumed,
            storageDeposit,
            partialFee,
          },
        };

        setIsSubmitting(false);
        setResult(r);

        return r;
      } catch (e: unknown) {
        console.error(e);
        setIsSubmitting(false);
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, chainContract?.contract, abiMessage]
  );

  return {
    send,
    isSubmitting,
    result,
    resolved: Boolean(result && !isSubmitting),
    resetState: () => {
      setIsSubmitting(false);
      setResult(undefined);
    },
  };
}
