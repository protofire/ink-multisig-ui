import { AppBar, Stack, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { ConnectButton } from "@/components/ModalWalletProvider/ConnectButton";
import { ROUTES } from "@/config/routes";

export function TopBar({
  buttonActionComponent = <ConnectButton />,
}: {
  buttonActionComponent?: React.ReactNode;
}) {
  return (
    <AppBar elevation={0} position="fixed">
      <Toolbar>
        <Stack direction="row" gap={1} sx={{ flexGrow: 1 }}>
          <Link href={ROUTES.Welcome} passHref>
            <Image
              src="/xSigners-logo-beta.svg"
              alt="xSigners Wallet"
              priority
              width={160}
              height={50}
            />
          </Link>
        </Stack>
        {buttonActionComponent}
      </Toolbar>
    </AppBar>
  );
}
