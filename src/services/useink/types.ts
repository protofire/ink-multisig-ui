export type { Chain, ChainId } from "useink/dist/chains";
export type { WalletAccount } from "useink/dist/core";
// 👆 Avoiding any using the implementation of talisman https://github.com/TalismanSociety/talisman-connect/blob/master/packages/connect-wallets/src/types.ts

export interface WalletAccount {
  address: string;
  source: string;
  name?: string;
  signer?: unknown;
}
