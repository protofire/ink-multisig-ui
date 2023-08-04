import { Box, BoxProps, Drawer, styled } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

import { useSettingsTheme } from "@/context/SettingsThemeConsumer";

import Navigation from "./Navigation";

const DEFAULT_WIDTH = 240;

interface DrawerStyledProps {
  drawerWidth: number;
}

const DrawerStyled = styled(Drawer)<DrawerStyledProps>(
  ({ drawerWidth, theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: "border-box",
    "& .MuiBackdrop-root": {
      display: "none",
    },
    "& .MuiDrawer-paper": {
      marginTop: 66,
      width: drawerWidth,
      borderRight: "none",
      backgroundColor: theme.palette.background.paper,
      elevation: 9,
    },
  })
);

const XsignerInfo = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: theme.spacing(11),
}));

export function VerticalMenuBar() {
  const [open, setOpen] = useState(true);
  const { pathname } = useRouter();
  const { settings } = useSettingsTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <DrawerStyled
      drawerWidth={settings.drawerWidth || DEFAULT_WIDTH}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Navigation currentPath={pathname} />
      <XsignerInfo />
    </DrawerStyled>
  );
}
