import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useDelay } from "@/hooks/useDelay";
import { DELAY_UNTIL_READ_WALLETS } from "@/services/useink/constants";

type Props = PropsWithChildren;

export function RouterRedirectGuard({ children }: Props) {
  const router = useRouter();
  const { accountConnected } = usePolkadotContext();
  const isDelayFinished = useDelay(DELAY_UNTIL_READ_WALLETS);

  useEffect(() => {
    if (!router.query.redirect || !accountConnected) return;

    const redirectPath = router.query.redirect as string; // Already decoded URI
    router.replace(decodeURIComponent(redirectPath));
  }, [router.query.redirect, accountConnected, router]);

  if (!isDelayFinished) return <FallbackSpinner />;

  return children;
}
