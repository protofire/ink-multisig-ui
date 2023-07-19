import { Button, CardMedia, Typography } from "@mui/material";
import Image from "next/image";

import { MainContentCard } from "@/components/layout/MainContentCard";
import { WelcomeLayout } from "@/components/layout/WelcomeLayout";
import { CRYPTO_WALLET } from "@/config/images";

export default function WelcomePage() {
  return (
    <WelcomeLayout>
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
        <Button size="large">
          <Typography variant="h3">Connect your wallet</Typography>
        </Button>
      </MainContentCard>
    </WelcomeLayout>
  );
}
