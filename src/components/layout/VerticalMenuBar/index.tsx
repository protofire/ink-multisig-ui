import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, DrawerProps, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

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
  const { pathname } = useRouter();
  const { settings, saveSettings } = useSettingsTheme();

  const handleDrawerOpen = () => {
    saveSettings({ ...settings, navOpen: true });
  };

  const handleDrawerClose = () => {
    saveSettings({ ...settings, navOpen: false });
  };

  return (
    <>
      <DrawerStyled
        drawerwidth={settings.drawerWidth || DEFAULT_WIDTH}
        variant="persistent"
        anchor="left"
        open={settings.navOpen}
      >
        <XsignerAccountInfoWidget />
        <Navigation currentPath={pathname} />
      </DrawerStyled>
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
          zIndex: "9999",
          margin: "1rem",
        }}
      >
        <IconButton
          onClick={settings.navOpen ? handleDrawerClose : handleDrawerOpen}
        >
          {settings.navOpen ? (
            <Tooltip title="Close menu" placement="top">
              <CloseIcon fontSize="large" />
            </Tooltip>
          ) : (
            <Tooltip title="Open menu" placement="top">
              <MenuIcon fontSize="large" />
            </Tooltip>
          )}
        </IconButton>
      </Box>
    </>
  );
}
