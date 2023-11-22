/** @type {import('next').NextConfig} */

const { config } = require("./src/services/squid/squidConfig");

const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/graphql/shibuya-testnet",
        destination: config["shibuya-testnet"],
      },
    ];
  },
};

module.exports = nextConfig;
