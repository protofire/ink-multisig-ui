import { ReactNode } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { NewSignatoriesAccount } from "@/components/NewSignatoriesAccount";
import { usePolkadotContext } from "@/context/usePolkadotContext";

export default function NewAccountPage() {
  const { network, accountConnected } = usePolkadotContext();

  if (!network || !accountConnected) return <FallbackSpinner />;

  return (
    <MainContentCard
      title="Create your multisig"
      paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit,e et dolore magn a aliqua. Ut enim 
ad minim veniam"
    >
      <NewSignatoriesAccount
        networkId={network}
        accountConnected={accountConnected}
      />
    </MainContentCard>
  );
}

NewAccountPage.getLayout = (page: ReactNode) => (
  <BasicLayout>{page}</BasicLayout>
);
