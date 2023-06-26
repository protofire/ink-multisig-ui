import { Account } from "@/config/chain";
import { useApiContext } from "@/context/useApiContext";
import { getInitValue } from "@/services/substrate/getInitValue";
import { AbiMessage, AbiParam, Registry } from "@/services/substrate/types";
import { useEffect, useMemo, useRef, useState } from "react";

type Argument = Record<string, unknown>;

function fromArgs(registry: Registry, accounts: Account[], args: AbiParam[]): Argument {
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
  
      if (type === 'Balance') {
        return registry.createType('Balance', value);
      }
  
      return value || null;
    });
  }
  


export function useArgValues(
    message: AbiMessage | undefined,
    registry: Registry | undefined
  ) {
    const { accounts } = useApiContext();
    const [argValues, setArgValues] = useState<Argument>({})
    const argsRef = useRef(message?.args ?? []);
    const inputData = useMemo(() => {
        let data: Uint8Array | undefined
        
        if (!registry) return

      try {
        data = message?.toU8a(transformUserInput(registry, message.args, argValues));
      } catch (e) {
        console.error(e);
      }
      return data;
    }, [argValues, registry, message]);
  
    useEffect((): void => {
        if(!accounts || !message || !registry || argsRef.current === message.args) return

        setArgValues(fromArgs(registry, accounts, message.args));
        argsRef.current = message.args;
    }, [accounts, message, registry]);
  
    return {argValues, setArgValues, inputData}
  }
  