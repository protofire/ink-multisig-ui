import { useRouter } from "next/router";
import { useEffect } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";

function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/welcome");
  }, [router]);

  return <FallbackSpinner />;
}
IndexPage.walletRequired = false;

export default IndexPage;
