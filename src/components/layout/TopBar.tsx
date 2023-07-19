import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import Image from "next/image";

import { WalletConnect } from "../WalletConnect";

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction={"row"} gap={1} sx={{ flexGrow: 1 }}>
          <Image src="/Simplr.ico" alt="Multisig Logo" width={30} height={30} />
          <Typography variant="h6" component="div">
            Multisig-UI
          </Typography>
        </Stack>
        <WalletConnect />
      </Toolbar>
    </AppBar>
  );
}
