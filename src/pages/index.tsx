import { GetServerSideProps } from "next";

import { ROUTES } from "@/config/routes";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: ROUTES.Welcome,
      permanent: false,
    },
  };
};

function IndexPage() {
  return null;
}
IndexPage.connectedWalletRequired = false;

export default IndexPage;
