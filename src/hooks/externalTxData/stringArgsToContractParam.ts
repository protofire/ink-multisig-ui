import JSON5 from "json5";

import { ContractParam } from "@/domain/repositores/ISquidDbRepository";
import { AbiMessage } from "@/services/substrate/types";

export function sringArgsToContractParam(
  argsAbiMessage: AbiMessage["args"],
  formattedParams: string
): ContractParam[] {
  const args = JSON5.parse(formattedParams);

  return argsAbiMessage.map((argAbi, index) => {
    const value = index < args.length ? args[index] : "";

    return {
      name: argAbi.name,
      value: value,
    };
  });
}
