import { Box } from "@mui/material";

import { MainContentCard } from "@/components/layout/MainContentCard";
import { WelcomeLayout } from "@/components/layout/WelcomeLayout";

export default function NewAccountPage() {
  return (
    <WelcomeLayout>
      <MainContentCard
        title="Load your multisig"
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit,e et dolore magn a aliqua. Ut enim 
ad minim veniam"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            mt: "5rem",
          }}
        >
          <p>Vertical Stepper</p>
          <p>Form To create Wallet</p>
        </Box>
      </MainContentCard>
    </WelcomeLayout>
  );
}
