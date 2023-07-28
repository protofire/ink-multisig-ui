import { useRouter } from "next/router";
import { useEffect } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import { ROUTES } from "@/config/routes";

function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTES.Welcome);
  }, [router]);

  return <FallbackSpinner text="Checking if you have some account..." />;
}
IndexPage.walletRequired = false;

export default IndexPage;
