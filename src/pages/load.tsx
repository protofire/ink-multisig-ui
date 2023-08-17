import { ReactNode } from "react";
import { ChainId } from "useink/dist/chains";

import ErrorMessage from "@/components/common/ErrorMessage";
import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import StepperNewSignersAccount from "@/components/StepperNewSignersAccount";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useListSignersAccount } from "@/hooks/signatoriesAccount";

export default function NewAccountPage() {
  const { network } = usePolkadotContext();
  const { data, error } = useListSignersAccount({ networkId: network });
  return (
    <MainContentCard title="Import a XSigners Account">
      <>
        {error && <ErrorMessage message={error} />}
        <StepperNewSignersAccount
          isExecuting={false}
          account={data?.[0]}
          networkId={network as ChainId}
        />
      </>
    </MainContentCard>
  );
}

NewAccountPage.getLayout = (page: ReactNode) => (
  <BasicLayout>{page}</BasicLayout>
);
