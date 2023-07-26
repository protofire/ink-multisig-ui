import { AppBar, Stack, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/config/routes";

import { WalletConnect } from "../WalletConnect";

export default function TopBar() {
  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Stack direction="row" gap={1} sx={{ flexGrow: 1 }}>
          <Link href={ROUTES.Home} passHref>
            <Image
              src="/cypherdot-logo.svg"
              alt="SypherDotMultisig"
              width={145}
              height={45}
            />
          </Link>
        </Stack>
        <WalletConnect />
      </Toolbar>
    </AppBar>
  );
}
