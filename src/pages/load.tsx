import { Box } from "@mui/material";
import { ReactNode } from "react";

import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";

export default function NewAccountPage() {
  return (
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
  );
}

NewAccountPage.getLayout = (page: ReactNode) => (
  <BasicLayout>{page}</BasicLayout>
);
