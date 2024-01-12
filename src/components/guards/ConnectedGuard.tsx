import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect } from "react";

import { ROUTES, RouteValue, routeValues } from "@/config/routes";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useDelay } from "@/hooks/useDelay";
import { DELAY_UNTIL_READ_WALLETS } from "@/services/useink/constants";

interface ConnectionGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}
const ROUTES_TO_CHECK = routeValues.filter((r) => r !== ROUTES.Connect);

function _getRedirectQuery(initialRoute: string) {
  if (ROUTES_TO_CHECK.includes(initialRoute as RouteValue)) {
    return {
      query: {
        redirect: `${encodeURIComponent(initialRoute)}`,
      },
    };
  }

  return null;
}

export function ConnectionGuard({ children, fallback }: ConnectionGuardProps) {
  const { accountConnected } = usePolkadotContext();
  const router = useRouter();
  const initialRoute = router.asPath ?? ROUTES.Welcome;
  const isDelayFinished = useDelay(DELAY_UNTIL_READ_WALLETS);

  useEffect(() => {
    if (!router.isReady) return;

    if (!accountConnected && isDelayFinished) {
      router.push({
        pathname: `${ROUTES.Connect}`,
        ..._getRedirectQuery(initialRoute),
      });
    }
  }, [accountConnected, initialRoute, isDelayFinished, router]);

  if (!accountConnected) {
    return fallback;
  }

  return children;
}
