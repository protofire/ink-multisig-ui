import { Container } from "@mui/material";
import React from "react";

import {
  MainContentWrapper,
  VerticalLayoutWrapper,
} from "@/components/layout/shared";
import TopBar from "@/components/layout/TopBar";

interface LayoutProps {
  children: React.ReactNode;
}

export const WelcomeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <VerticalLayoutWrapper>
      <MainContentWrapper>
        <TopBar />
        <Container>{children}</Container>
      </MainContentWrapper>
    </VerticalLayoutWrapper>
  );
};
