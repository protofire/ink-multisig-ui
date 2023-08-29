import { ReactNode } from "react";

import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { LoadNewAccount } from "@/components/StepperSignersAccount";

export default function LoadAccountPage() {
  return (
    <MainContentCard title="Import a XSigners Account">
      <LoadNewAccount />
    </MainContentCard>
  );
}

LoadAccountPage.getLayout = (page: ReactNode) => (
  <BasicLayout>{page}</BasicLayout>
);
