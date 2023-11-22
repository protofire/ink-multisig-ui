type ChainId = import("@/services/useink/types").ChainId;

export const squidConfig: Partial<Record<ChainId, string>> = {
  "shibuya-testnet": "http://18.118.77.170:4350/graphql",
};
