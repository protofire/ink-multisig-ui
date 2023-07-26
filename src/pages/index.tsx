import { useRouter } from "next/router";
import { useEffect } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";

function IndexPage() {
  const router = useRouter();
  // const { data } = useGet;

  useEffect(() => {
    router.replace("/welcome");
  }, [router]);

  return <FallbackSpinner text="Checking if you have some account..." />;
}
IndexPage.walletRequired = false;

export default IndexPage;
