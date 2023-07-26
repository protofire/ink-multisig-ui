import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useRef } from "react";

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
  const { accountConnected, isConnecting } = usePolkadotContext();
  const router = useRouter();
  const initialRoute = useRef(router.asPath);

  useEffect(() => {
    if (!router.isReady) return;

    if (!accountConnected && !isConnecting) {
      router.push({
        pathname: `${ROUTES.Connect}`,
        ..._getRedirectQuery(initialRoute.current),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountConnected, initialRoute.current]);

  if (!accountConnected || isConnecting) {
    return fallback;
  }

  return <>{children}</>;
}