import { Container } from "@mui/material";
import React from "react";

import { ApplicationBars } from "@/components/layout/ApplicationBars";
import {
  MainContentWrapper,
  VerticalLayoutWrapper,
} from "@/components/layout/shared";

interface LayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <VerticalLayoutWrapper>
      <MainContentWrapper>
        <ApplicationBars navHidden={false} />
        <Container>{children}</Container>
      </MainContentWrapper>
    </VerticalLayoutWrapper>
  );
};
