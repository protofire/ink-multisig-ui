import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { ReactNode } from "react";

import ErrorMessage from "@/components/common/ErrorMessage";
import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { XsignersAccountTable } from "@/components/XsignersAccountTable";
import { ROUTES } from "@/config/routes";
import { useCallerXsignersAccount } from "@/context/CallerXsigerAccounts";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";

export default function WelcomePage() {
  const { accountConnected, network } = usePolkadotContext();
  const { setXsigner } = useSetXsignerSelected();
  const theme = useTheme();
  const {
    multisigs,
    isLoading: isLoadingMultisigs,
    error,
  } = useCallerXsignersAccount();

  return (
    <Box>
      {error && <ErrorMessage message={error} />}
      <MainContentCard
        stylesContainer={{
          alignItems: "center",
          sx: {
            backgroundColor: theme.palette.background.paper,
            padding: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3 },
          },
        }}
      >
        <Typography variant="h1" color="white">
          Welcome to XSigners
        </Typography>
        <Typography variant="h5" color="grey">
          The most trusted decentralized multisig platform on Polkadot
          ecosystem.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
            mt: "4rem",
            gap: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h3" color="white">
              Create a new Multisig
            </Typography>
            <Typography variant="body1" color="grey">
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
        </Box>
      </MainContentCard>
      {!isLoadingMultisigs ? (
        <XsignersAccountTable
          network={network}
          onClick={setXsigner}
          multisigs={multisigs}
          accountConnected={accountConnected?.address}
        />
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" p={2}>
          <CircularProgress size={50} />
        </Box>
      )}
    </Box>
  );
}

WelcomePage.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;
WelcomePage.connectedWalletRequired = false;
