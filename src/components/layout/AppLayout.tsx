import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { PropsWithChildren } from "react";

import {
  MainContentWrapper,
  VerticalLayoutWrapper,
} from "@/components/layout/shared";
import { TopBar } from "@/components/layout/TopBar";
import { useSettingsTheme } from "@/context/SettingsThemeConsumer";
import { scalePixels } from "@/themes/spacing";

import { Footer } from "./Footer";
import { VerticalMenuBar } from "./VerticalMenuBar";

const ContentWrapper = styled(Box)<BoxProps & { drawerwidth: number }>(
  ({ theme, drawerwidth }) => ({
    width: "100%",
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(scalePixels(drawerwidth) + 4),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.up("xl")]: {
      paddingLeft: theme.spacing(scalePixels(drawerwidth) + 20),
      paddingRight: theme.spacing(20),
    },
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

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { settings } = useSettingsTheme();
  const marginLeft = settings.navOpen ? settings.drawerWidth || 0 : 0;

  return (
    <VerticalLayoutWrapper>
      <MainContentWrapper>
        <TopBar />
        <VerticalMenuBar />
        <ContentWrapper drawerwidth={marginLeft} component="main">
          {children}
        </ContentWrapper>
        <Footer />
      </MainContentWrapper>
    </VerticalLayoutWrapper>
  );
};
