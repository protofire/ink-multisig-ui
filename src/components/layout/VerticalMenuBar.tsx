import { Divider, Drawer } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

import Navigation from "./Navigation";

const drawerWidth = 240;

export function VerticalMenuBar() {
  const [open, setOpen] = useState(true);
  const { pathname } = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
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
      <Navigation currentPath={pathname} />
    </Drawer>
  );
}
