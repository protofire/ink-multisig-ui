import { PropsWithChildren } from "react";

import { ConnectedGuard } from "./ConnectedGuard";

type GuardProps = PropsWithChildren & {
  walletRequired: boolean;
};

export const WalletConnectionGuard = ({
  children,
  walletRequired,
}: GuardProps) => {
  if (walletRequired) {
    return <ConnectedGuard>{children}</ConnectedGuard>;
  }

  return <>{children}</>;
};
