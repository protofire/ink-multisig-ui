import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/config/routes";

import { WalletConnect } from "../WalletConnect";

export default function TopBar() {
  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Stack direction="row" gap={1} sx={{ flexGrow: 1 }}>
          <Image src="/Simplr.ico" alt="Multisig Logo" width={30} height={30} />
          <Link href={ROUTES.Home} passHref>
            <Typography variant="h6" component="div">
              Multisig-UI
            </Typography>
          </Link>
        </Stack>
        <WalletConnect />
      </Toolbar>
    </AppBar>
  );
}
