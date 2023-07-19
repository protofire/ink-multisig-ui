import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

import { MainContentCard } from "@/components/layout/MainContentCard";
import { WelcomeLayout } from "@/components/layout/WelcomeLayout";
import { ROUTES } from "@/config/routes";

export default function WelcomePage() {
  return (
    <WelcomeLayout>
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
    </WelcomeLayout>
  );
}
