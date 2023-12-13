import { useEffect, useMemo, useRef, useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Account, getInitValue } from "@/services/substrate/getInitValue";
import { AbiMessage, AbiParam, Registry } from "@/services/substrate/types";

type Argument = Record<string, unknown>;

export interface UseArgValuesReturn {
  argValues: Argument;
  setArgValues: React.Dispatch<React.SetStateAction<Argument>>;
  inputData: unknown[] | undefined;
  inputDataU8a: Uint8Array | undefined;
}

function fromArgs(
  registry: Registry,
  accounts: Account[],
  args: AbiParam[]
): Argument {
  const result: Argument = {};

  args?.forEach(({ name, type }) => {
    result[name] = getInitValue(registry, accounts, type);
  });

  return result;
}

export function transformUserInput(
  registry: Registry,
  messageArgs: AbiParam[],
  values?: Record<string, unknown>
): unknown[] {
  return messageArgs.map(({ name, type: { type } }) => {
    const value = values ? values[name] : null;

    if (type === "Balance") {
      return registry.createType("Balance", value);
    }

    return value || null;
  });
}

export function useArgValues(
  message: AbiMessage | undefined,
  registry: Registry | undefined
): UseArgValuesReturn {
  const { accounts } = usePolkadotContext();
  const [argValues, setArgValues] = useState<Argument>({});
  const argsRef = useRef(message?.args ?? []);

  const inputData = useMemo(() => {
    let data: unknown[] = [];

    if (!registry) return;

    try {
      if (message) {
        data = transformUserInput(registry, message.args, argValues);
      }
    } catch (e) {
      console.error(e);
    }
    return data;
  }, [argValues, registry, message]);

  useEffect((): void => {
    if (!accounts || !message || !registry || argsRef.current === message.args)
      return;

    setArgValues(fromArgs(registry, accounts, message.args));
    argsRef.current = message.args;
  }, [accounts, message, registry]);

  const inputDataU8a = useMemo(
    () => inputData && message?.toU8a(inputData),
    [inputData, message]
  );

  return { argValues, setArgValues, inputData, inputDataU8a };
}
