import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import { ROUTES } from "@/config/routes";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useDelay } from "@/hooks/useDelay";
import { useFindSignersAccount } from "@/hooks/xsignersAccount/useFindSignersAccount";
import { DELAY_UNTIL_READ_WALLETS } from "@/services/useink/constants";

type Props = PropsWithChildren;

export function RouterRedirectGuard({ children }: Props) {
  const router = useRouter();
  const { accountConnected, network } = usePolkadotContext();
  const isDelayFinished = useDelay(DELAY_UNTIL_READ_WALLETS);
  const { data: signatoriesAccount } = useFindSignersAccount({
    ownerAddress: accountConnected?.address,
    networkId: network,
  });
  const defaultPath =
    router.query.redirect !== undefined
      ? (router.query.redirect as string)
      : ROUTES.Welcome;

  useEffect(() => {
    if (!accountConnected || signatoriesAccount === undefined) return;

    const redirectPath = signatoriesAccount.length ? ROUTES.App : defaultPath;

    router.replace(decodeURIComponent(redirectPath));
  }, [accountConnected, router, signatoriesAccount, defaultPath]);

  if (!isDelayFinished) return <FallbackSpinner />;

  return children;
}
