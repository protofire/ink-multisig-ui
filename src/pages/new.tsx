import { ReactNode } from "react";

import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import { NewSignatoriesAccount } from "@/components/NewSignatoriesAccount/indext";

export default function NewAccountPage() {
  return (
    <MainContentCard
      title="Create your multisig"
      paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit,e et dolore magn a aliqua. Ut enim 
ad minim veniam"
    >
      <NewSignatoriesAccount />
    </MainContentCard>
  );
}

NewAccountPage.getLayout = (page: ReactNode) => (
  <BasicLayout>{page}</BasicLayout>
);
