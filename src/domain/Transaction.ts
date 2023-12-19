import { Transaction as TransactionTyped } from "xsigners-sdk-test/src/typed_contracts/multisig/types-returns/multisig";

import { AbiMessage } from "@/services/substrate/types";

export type Transaction = Omit<
  TransactionTyped,
  "input" | "transferredValue" | "selector"
> & {
  input: unknown[] | undefined;
  transferredValue: number;
  selector: AbiMessage["selector"];
};
