import { Box, Typography } from "@mui/material";
import getConfig from "next/config";
import React from "react";

import { FooterContainer } from "./styled";

const { publicRuntimeConfig } = getConfig();
const version = publicRuntimeConfig?.version;

function isBetaVersion(_version: string): boolean {
  const betaRegex = /-beta|-alpha|-rc/;

  return betaRegex.test(_version);
}

export const Footer: React.FC = () => {
  const isBeta = isBetaVersion(version);

  return (
    <FooterContainer>
      {isBeta && (
        <Typography variant="body1">
          This project is in beta. Use at your own risk.
        </Typography>
      )}
      {version && (
        <Box display="flex" justifyContent={"right"} pr={"1rem"}>
          <Typography
            sx={{
              color: "#ffffff7d",
              fontSize: "0.65rem",
              marginTop: "0.2rem",
            }}
          >
            UI V{version}
          </Typography>
        </Box>
      )}
    </FooterContainer>
  );
};
