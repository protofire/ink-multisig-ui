import { ReactNode } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { CreateNewAccount } from "@/components/StepperSignersAccount";
import { usePolkadotContext } from "@/context/usePolkadotContext";

export default function NewAccountPage() {
  const { network, accountConnected } = usePolkadotContext();

  if (!network || !accountConnected) return <FallbackSpinner />;

  return (
    <MainContentCard title="Create new XSigners Account">
      <CreateNewAccount networkId={network} />
    </MainContentCard>
  );
}

NewAccountPage.getLayout = (page: ReactNode) => (
  <BasicLayout>{page}</BasicLayout>
);
