import { PropsWithChildren } from "react";

import { FallbackSpinner } from "../../common/FallbackSpinner";
import { ConnectedGuard } from "./ConnectedGuard";

type GuardProps = PropsWithChildren & {
  walletRequired: boolean;
};

export const WalletConnectionGuard = ({
  children,
  walletRequired,
}: GuardProps) => {
  if (walletRequired) {
    return (
      <ConnectedGuard
        fallback={<FallbackSpinner text="Checking wallet connection" />}
      >
        {children}
      </ConnectedGuard>
    );
  }

  return children;
};
