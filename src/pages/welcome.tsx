import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

import { ButtonBase } from "@/components/common/muiExtended/Button";
import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { ROUTES } from "@/config/routes";

export default function WelcomePage() {
  return (
    <MainContentCard>
      <Typography variant="h1" color="white">
        Welcome to CypherDOT
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
            <ButtonBase variant="contained">
              <AddCircleIcon />
              <Typography variant="h4">Create new Account</Typography>
            </ButtonBase>
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
            Add existing Account
          </Typography>
          <Typography variant="body1" color="white">
            Already have a CypherDOT Account? Add it via its address.
          </Typography>
          <Link href={ROUTES.Load} passHref>
            <ButtonBase variant="outlined">
              <AccountBalanceWalletIcon />
              <Typography variant="h4">Add existing Account</Typography>
            </ButtonBase>
          </Link>
        </Box>
      </Box>
    </MainContentCard>
  );
}

WelcomePage.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;
WelcomePage.walletRequired = false;
