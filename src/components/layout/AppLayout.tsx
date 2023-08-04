import { Box, BoxProps, styled } from "@mui/material";
import React from "react";

import { ApplicationBars } from "@/components/layout/ApplicationBars";
import {
  MainContentWrapper,
  VerticalLayoutWrapper,
} from "@/components/layout/shared";
import { useSettingsTheme } from "@/context/SettingsThemeConsumer";
import { scalePixels } from "@/themes/spacing";

import { VerticalMenuBar } from "./VerticalMenuBar";

interface LayoutProps {
  children: React.ReactNode;
}

const ContentWrapper = styled(Box)<BoxProps & { drawerWidth: number }>(
  ({ theme, drawerWidth }) => ({
    width: "100%",
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(scalePixels(drawerWidth) + 2),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  })
);

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const { settings } = useSettingsTheme();
  const marginLeft = settings.navOpen ? settings.drawerWidth || 0 : 0;

  return (
    <VerticalLayoutWrapper>
      <MainContentWrapper>
        <ApplicationBars navHidden={false} />
        <VerticalMenuBar />
        <ContentWrapper drawerWidth={marginLeft} component="main">
          {children}
        </ContentWrapper>
      </MainContentWrapper>
    </VerticalLayoutWrapper>
  );
};
