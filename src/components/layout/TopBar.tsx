import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
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
        <Link href="https://docs.xsigners.io/" target="_blank" rel="noopener">
          <Typography
            variant="body1"
            color="primary"
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#242424",
              padding: "0.3rem 1rem",
              margin: "0 1rem 0 0",
              borderRadius: "0.4rem",
              gap: "0.5rem",
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            Docs
            <OpenInNewIcon fontSize="small" color="secondary" />
          </Typography>
        </Link>
        {buttonActionComponent}
      </Toolbar>
    </AppBar>
  );
}
