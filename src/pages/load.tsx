import { ReactNode } from "react";
import { ChainId } from "useink/dist/chains";

import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { LoadNewAccount } from "@/components/StepperSignersAccount";
import { usePolkadotContext } from "@/context/usePolkadotContext";

export default function NewAccountPage() {
  const { network } = usePolkadotContext();
  return (
    <MainContentCard title="Import a XSigners Account">
      <>
        <LoadNewAccount isExecuting={false} networkId={network as ChainId} />
      </>
    </MainContentCard>
  );
}

NewAccountPage.getLayout = (page: ReactNode) => (
  <BasicLayout>{page}</BasicLayout>
);
