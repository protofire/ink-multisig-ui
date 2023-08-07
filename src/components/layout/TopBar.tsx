import { AppBar, Stack, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/config/routes";

import { WalletConnect } from "../WalletConnect";

export function TopBar() {
  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Stack direction="row" gap={1} sx={{ flexGrow: 1 }}>
          <Link href={ROUTES.Home} passHref>
            <Image
              src="/xSigners-logo.svg"
              alt="xSigners Wallet"
              width={160}
              height={50}
            />
          </Link>
        </Stack>
        <WalletConnect />
      </Toolbar>
    </AppBar>
  );
}
