import { AppBar, Stack, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { ConnectButton } from "@/components/ModalWalletProvider/ConnectButton";
import { WalletConnect } from "@/components/WalletConnect";
import { ROUTES } from "@/config/routes";

export function TopBar({
  buttonActionComponent = <ConnectButton />,
}: {
  buttonActionComponent?: React.ReactNode;
}) {
  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Stack direction="row" gap={1} sx={{ flexGrow: 1 }}>
          <Link href={ROUTES.Home} passHref>
            <Image
              src="/xSigners-logo.svg"
              alt="xSigners Wallet"
              priority
              width={160}
              height={50}
            />
          </Link>
        </Stack>
        <WalletConnect />
        {buttonActionComponent}
      </Toolbar>
    </AppBar>
  );
}
