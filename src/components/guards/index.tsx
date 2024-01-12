import { PropsWithChildren } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";

import { ConnectionGuard } from "./ConnectedGuard";
import { WhenWalletIsConnectedGuard } from "./WhenWalletIsConnectedGuard";
import { XsignerCreatedGuard } from "./XsignerCreatedGuard";

type GuardProps = PropsWithChildren & {
  connectedWalletRequired: boolean;
};

export const Guard = ({ children, connectedWalletRequired }: GuardProps) => {
  if (connectedWalletRequired) {
    return (
      <ConnectionGuard
        fallback={<FallbackSpinner text="Checking wallet connection" />}
      >
        <XsignerCreatedGuard
          fallback={<FallbackSpinner text="Checking xsigner selected" />}
        >
          {children}
        </XsignerCreatedGuard>
      </ConnectionGuard>
    );
  }

  return <WhenWalletIsConnectedGuard>{children}</WhenWalletIsConnectedGuard>;
};
