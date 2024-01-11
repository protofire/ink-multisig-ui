import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode, useState } from "react";

import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { ROUTES } from "@/config/routes";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";
import { useRedirectComparison } from "@/hooks/useRedirectComparison";

export function getTextInstructions(route: string) {
  if (route === ROUTES.New) {
    return "To create a new account";
  } else if (route === ROUTES.Load) {
    return "To load an existing account";
  }
}
export function ConnectWalletPage() {
  const [instructions, setInstructions] = useState<string | undefined>();
  const theme = useTheme();

  useRedirectComparison({
    redirectUrls: [ROUTES.New, ROUTES.Load],
    onMatch: (route) => setInstructions(getTextInstructions(route)),
  });

  const disptachConnect = () => {
    document.dispatchEvent(
      new CustomEvent(WalletConnectionEvents.onWalletConnection)
    );
  };

  return (
    <MainContentCard
      stylesContainer={{
        alignItems: "center",
        sx: {
          backgroundColor: theme.palette.background.paper,
          padding: "2rem 1rem",
        },
      }}
      title="Connect your Wallet"
      paragraph="To continue with the following actions you need to connect your wallet."
    >
      {instructions && (
        <Typography variant="body1">
          {instructions}, you will need a wallet to sign the transaction.
        </Typography>
      )}
      <Button variant="contained" onClick={disptachConnect}>
        <AccountBalanceWalletIcon />
        Connect your wallet
      </Button>
    </MainContentCard>
  );
}

ConnectWalletPage.connectedWalletRequired = false;
ConnectWalletPage.getLayout = (page: ReactNode) => (
  <BasicLayout>{page}</BasicLayout>
);

export default ConnectWalletPage;
