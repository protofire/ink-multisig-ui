// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const SHIBUYA_GQL_ENDPOINT = process.env.NEXT_SHIBUYA_GQL_ENDPOINT;
module.exports.config = {
  "shibuya-testnet": SHIBUYA_GQL_ENDPOINT,
};
