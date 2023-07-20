import { Container, Divider, Drawer } from "@mui/material";
import React from "react";

import {
  MainContentWrapper,
  VerticalLayoutWrapper,
} from "@/components/layout/shared";
import TopBar from "@/components/layout/TopBar";

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <VerticalLayoutWrapper>
      <MainContentWrapper>
        <TopBar />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Divider />
          Menu
        </Drawer>
        <Container>{children}</Container>
      </MainContentWrapper>
    </VerticalLayoutWrapper>
  );
};
