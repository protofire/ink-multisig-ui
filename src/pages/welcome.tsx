import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { ROUTES } from "@/config/routes";

export default function WelcomePage() {
  return (
    <MainContentCard>
      <Typography variant="h1">Welcome to</Typography>
      <Typography variant="h1">Ink multisig! 🚀</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          mt: "5rem",
        }}
      >
        <Link href={ROUTES.New} passHref>
          <Button variant="outlined">
            <Box>
              <AddCircleIcon />
              <Typography variant="h3">New Account</Typography>
            </Box>
          </Button>
        </Link>
        <Link href={ROUTES.Load} passHref>
          <Button variant="outlined">
            <Box>
              <AccountBalanceWalletIcon />
              <Typography variant="h3">Load Account</Typography>
            </Box>
          </Button>
        </Link>
      </Box>
    </MainContentCard>
  );
}

WelcomePage.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;
WelcomePage.walletRequired = false;
