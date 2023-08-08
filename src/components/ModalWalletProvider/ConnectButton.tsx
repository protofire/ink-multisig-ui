import * as React from "react";

import { StyledConnectButton } from "@/components/ModalWalletProvider/styled";
import { useRecentlyClicked } from "@/hooks/useRecentlyClicked";

export const ConnectButton: React.FC = () => {
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(500);

  return (
    <>
      <StyledConnectButton ref={refButton} isLoading={recentlyClicked}>
        Connect
      </StyledConnectButton>
    </>
  );
};
