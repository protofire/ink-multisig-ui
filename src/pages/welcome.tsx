import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { ReactNode } from "react";

import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { ROUTES } from "@/config/routes";

export default function WelcomePage() {
  const theme = useTheme();
  return (
    <MainContentCard
      styles={{
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h1" color="white">
        Welcome to XSigners
      </Typography>
      <Typography variant="h4" color="white">
        The most trusted decentralized multisig platform on Polkadot ecosystem.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
          mt: "5rem",
          gap: "3rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography variant="h3" color="white">
            Create a new Multisig
          </Typography>
          <Typography variant="body1" color="white">
            A new Account that is controlled by one or multiple owners.
          </Typography>
          <Link href={ROUTES.New} passHref>
            <Button
              variant="contained"
              sx={{ color: theme.palette.common.black }}
            >
              <AddCircleIcon />
              Create new Account
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography variant="h3" color="white">
            Import existing Account
          </Typography>
          <Typography variant="body1" color="white">
            Already have a XSigners Account? Add it via its address.
          </Typography>
          <Link href={ROUTES.Load} passHref>
            <Button variant="outlined">
              <AccountBalanceWalletIcon />
              Import existing Account
            </Button>
          </Link>
        </Box>
      </Box>
    </MainContentCard>
  );
}

WelcomePage.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;
WelcomePage.walletRequired = false;
