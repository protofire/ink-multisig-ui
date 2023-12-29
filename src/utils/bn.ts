import { BN_ONE } from "@polkadot/util";
import BN from "bn.js";

export const BN_ZERO = new BN(0);

export function isBn(value: unknown): value is typeof BN_ZERO {
  return BN.isBN(value);
}

export const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
export const PROOFSIZE = new BN(1_000_000);
