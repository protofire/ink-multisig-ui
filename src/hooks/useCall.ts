import { useEffect, useMemo, useState } from "react";
import {
  ContractExecResult,
  decodeCallResult,
  toContractAbiMessage,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
} from "useink/core";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { BN_ZERO } from "@/utils/bn";

import { usePSPContractPromise } from "./contractPromise/usePSPContractPromise";

const DEFAULT_RESPONSE = {
  ok: false,
  value: undefined,
};

const DEFAULT_METHOD_RESPONSES: { [key: string]: unknown } = {
  "psp22Metadata::tokenName": "Unknown",
  "psp22Metadata::tokenDecimals": "0",
};

const MAX_WAIT_TIME = 2000;

export function useCall(
  address: string,
  methodName: string,
  caller?: string,
  args: unknown[] = []
) {
  const { pSPContractPromise: contractPromise } =
    usePSPContractPromise(address);
  const contract = useMemo(() => {
    return contractPromise?.contract;
  }, [contractPromise]);
  const { accountConnected } = usePolkadotContext();

  const [data, setData] = useState<{ ok: boolean; value: unknown }>(
    DEFAULT_RESPONSE
  );
  const [error, setError] = useState<string | undefined>();

  const reset = () => {
    setData(DEFAULT_RESPONSE);
    setError(undefined);
  };
  useEffect(() => {
    if (!address) return;
    const timer = setTimeout(() => {
      if (!data.ok || (data.ok && data.value === undefined)) {
        setError(`Cannot get ${methodName} data.`);
        setData({
          ok: true,
          value: DEFAULT_METHOD_RESPONSES[methodName],
        });
      }
    }, MAX_WAIT_TIME);

    return () => clearTimeout(timer);
  }, [address, data, methodName]);

  useEffect(() => {
    reset();
    const fetchContractData = async () => {
      if (contract) {
        const apiCaller = contract.api.call.contractsApi;
        const abiMessage = toContractAbiMessage(contract, methodName);
        if (!abiMessage.ok) return;
        try {
          const raw = await apiCaller.call<ContractExecResult>(
            caller ?? accountConnected?.address,
            contract.address,
            BN_ZERO,
            null,
            null,
            abiMessage.value.toU8a(args)
          );
          if (!raw) return;
          const decodedData = decodeCallResult(
            raw.result,
            abiMessage.value,
            contract.abi.registry
          );
          setData(decodedData);
        } catch (error) {
          const e = error as Error;
          setError(e.message);
        }
      }
    };

    if (address) {
      fetchContractData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    contract,
    methodName,
    accountConnected?.address,
    address,
    caller,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(args),
  ]);

  return { data, error, reset };
}
