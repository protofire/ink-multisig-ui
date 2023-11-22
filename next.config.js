/** @type {import('next').NextConfig} */

const { squidConfig } = require("./src/config/squid");

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
        source: "/api/graphql/:chain",
        destination: (req, res) => {
          const chain = req.params.chain;

          const url = squidConfig[chain];

          if (url) {
            return url;
          } else {
            res.statusCode = 404;
            res.end(`No configuration found for string: ${chain}`);
          }
        },
      },
    ];
  },
};

module.exports = nextConfig;
