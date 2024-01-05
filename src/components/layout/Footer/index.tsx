import { Tooltip, Typography } from "@mui/material";
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
        <Tooltip
          title="This project is in beta. Use at your own risk."
          placement="top"
        >
          <Typography variant="caption" color="primary">
            Beta version
          </Typography>
        </Tooltip>
      )}
      {version && <Typography variant="caption">UI V{version}</Typography>}
    </FooterContainer>
  );
};
