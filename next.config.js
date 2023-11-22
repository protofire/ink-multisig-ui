/** @type {import('next').NextConfig} */

const { squidConfig } = require("./src/services/squid/squidConfig");

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
        destination: squidConfig["shibuya-testnet"],
      },
    ];
  },
};

module.exports = nextConfig;
