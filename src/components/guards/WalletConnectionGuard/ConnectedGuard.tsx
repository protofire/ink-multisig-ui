import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect } from "react";

import { ROUTES, RouteValue, routeValues } from "@/config/routes";
import { usePolkadotContext } from "@/context/usePolkadotContext";

interface ConnectedGuardProps {
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

export function ConnectedGuard({ children, fallback }: ConnectedGuardProps) {
  const { accountConnected } = usePolkadotContext();
  const router = useRouter();
  const initialRoute = router.asPath ?? ROUTES.Welcome;

  useEffect(() => {
    if (!router.isReady) return;

    if (!accountConnected) {
      router.push({
        pathname: `${ROUTES.Connect}`,
        ..._getRedirectQuery(initialRoute),
      });
    }
  }, [accountConnected, initialRoute, router]);

  if (!accountConnected) {
    return fallback;
  }

  return <>{children}</>;
}
