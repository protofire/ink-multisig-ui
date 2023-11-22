// eslint-disable-next-line @typescript-eslint/no-var-requires
const types = require("@/services/useink/types");

type ChainId = typeof types.ChainId;

export const squidConfig: Partial<Record<ChainId, string>> = {
  "shibuya-testnet": "http://18.118.77.170:4350/graphql",
};
