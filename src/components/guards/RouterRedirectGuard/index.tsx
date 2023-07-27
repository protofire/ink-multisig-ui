import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useListSignatoriesAccount } from "@/hooks/signatoriesAccount/useListSignatoriesAccount";
import { useDelay } from "@/hooks/useDelay";
import { DELAY_UNTIL_READ_WALLETS } from "@/services/useink/constants";

type Props = PropsWithChildren;

export function RouterRedirectGuard({ children }: Props) {
  const router = useRouter();
  const { accountConnected, network } = usePolkadotContext();
  const isDelayFinished = useDelay(DELAY_UNTIL_READ_WALLETS);
  const { data: signatoriesAccount } = useListSignatoriesAccount({
    walletAddress: accountConnected?.address,
    networkId: network,
  });

  useEffect(() => {
    if (
      !router.query.redirect ||
      !accountConnected ||
      signatoriesAccount === undefined
    )
      return;

    const redirectPath = router.query.redirect as string; // Already decoded URI
    router.replace(decodeURIComponent(redirectPath));
  }, [router.query.redirect, accountConnected, router, signatoriesAccount]);

  if (!isDelayFinished) return <FallbackSpinner />;

  return children;
}
