import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef } from "react";

import { ROUTES, RouteValue, routeValues } from "@/config/routes";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import ConnectWalletPage from "@/pages/connect";

import { BasicLayout } from "../layout/BasicLayout";

interface ConnectedGuardProps {
  children: ReactNode;
}
const ROUTES_TO_CHECK = routeValues.filter((r) => r !== ROUTES.Connect);

export function ConnectedGuard({ children }: ConnectedGuardProps) {
  const { accountConnected } = usePolkadotContext();
  const router = useRouter();
  const initialRoute = useRef(router.asPath);

  useEffect(() => {
    if (
      !accountConnected &&
      ROUTES_TO_CHECK.includes(initialRoute.current as RouteValue)
    ) {
      router.push(
        `${ROUTES.Connect}?redirect=${encodeURIComponent(initialRoute.current)}`
      );
    } else {
      const redirect = router.query.redirect as string;
      redirect && router.push(decodeURIComponent(redirect));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountConnected, initialRoute.current]);

  if (!accountConnected) {
    return (
      <BasicLayout>
        <ConnectWalletPage />
      </BasicLayout>
    );
  }

  return <>{children}</>;
}
