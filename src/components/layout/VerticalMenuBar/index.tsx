import { Drawer, DrawerProps, styled } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

import { XsignerAccountInfoWidget } from "@/components/XsignerAccountInfoWidget";
import { useSettingsTheme } from "@/context/SettingsThemeConsumer";

import Navigation from "../Navigation";

const DEFAULT_WIDTH = 240;

interface DrawerStyledProps extends DrawerProps {
  drawerwidth: number;
}

const DrawerStyled = styled(Drawer)<DrawerStyledProps>(
  ({ drawerwidth, theme }) => ({
    width: drawerwidth,
    flexShrink: 0,
    boxSizing: "border-box",
    "& .MuiBackdrop-root": {
      display: "none",
    },
    "& .MuiDrawer-paper": {
      marginTop: 66,
      width: drawerwidth,
      borderRight: "none",
      backgroundColor: theme.palette.background.paper,
      elevation: 9,
    },
  })
);

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
      drawerwidth={settings.drawerWidth || DEFAULT_WIDTH}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <XsignerAccountInfoWidget />
      <Navigation currentPath={pathname} />
    </DrawerStyled>
  );
}
