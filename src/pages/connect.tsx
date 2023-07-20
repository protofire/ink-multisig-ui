import { Button, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import { ReactNode, useState } from "react";

import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { CRYPTO_WALLET } from "@/config/images";
import { ROUTES } from "@/config/routes";
import useRedirectComparison from "@/hooks/useRedirectComparison";

export function getTextInstructions(route: string) {
  if (route === ROUTES.New) {
    return "To create a new account";
  } else if (route === ROUTES.Load) {
    return "To load an existing account";
  }
}

export default function ConnectWalletPage() {
  const [instructions, setInstructions] = useState<string | undefined>();

  useRedirectComparison({
    redirectUrls: [ROUTES.New, ROUTES.Load],
    onMatch: (route) => setInstructions(getTextInstructions(route)),
  });

  return (
    <MainContentCard
      title="Connect your Wallet"
      paragraph="To continue with the following actions you need to connect your wallet"
    >
      <CardMedia>
        <Image
          priority
          src={CRYPTO_WALLET}
          alt={"Icon wallet"}
          width={256}
          height={256}
        />
      </CardMedia>
      {instructions && (
        <Typography variant="body1">
          {instructions}, you will need a wallet to sign the transaction
        </Typography>
      )}
      <Button size="large">
        <Typography variant="h3">Connect your wallet</Typography>
      </Button>
    </MainContentCard>
  );
}

ConnectWalletPage.getLayout = (page: ReactNode) => (
  <BasicLayout>{page}</BasicLayout>
);
