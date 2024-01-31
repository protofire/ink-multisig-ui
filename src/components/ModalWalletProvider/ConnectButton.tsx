import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { ChainId } from "useink/dist/chains";

import { StyledConnectButton } from "@/components/ModalWalletProvider/styled";
import { ROUTES } from "@/config/routes";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";
import { useModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { useRecentlyClicked } from "@/hooks/common/useRecentlyClicked";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { WalletAccount } from "@/services/useink/types";
import { areAddressesEqual } from "@/utils/blockchain";

import AccountConfirmationModal from "../AccountConfirmationModal";
import { AccountSelect } from "../AccountSelect";
import { NetworkSelect } from "../NetworkSelect";
import { ModalWallet } from ".";

export const ConnectButton: React.FC = () => {
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(500);
  const [displayModalWallet, setDisplayModalWallet] = React.useState(false);
  const {
    wallets,
    connectWallet,
    disconnectWallet,
    isConnected,
    accountConnected,
    accounts,
    setAccount,
    setNetwork,
    network,
  } = usePolkadotContext();
  const router = useRouter();
  const { xSignerSelected } = useGetXsignerSelected();
  const redirectRoutes = [ROUTES.New, ROUTES.Load] as string[];
  const { closeModal, isOpen, openModal } = useModalBehaviour();
  const [confirmedAccount, setConfirmedAccount] = useState<
    WalletAccount | undefined
  >();

  useEventListenerCallback(WalletConnectionEvents.onWalletConnection, () =>
    setDisplayModalWallet(true)
  );

  const _setAccount = (account: WalletAccount) => {
    if (!xSignerSelected) {
      setAccount(account);
      return;
    }

    const isOwner = xSignerSelected.owners.find((o) =>
      areAddressesEqual(o.address, account.address)
    );

    if (isOwner) {
      setAccount(account);
    } else {
      setConfirmedAccount(account);
      openModal();
    }
  };

  const handleNetworkChange = (chainId: ChainId | undefined) => {
    if (chainId === undefined) return;

    setNetwork(chainId);
    if (
      chainId !== xSignerSelected?.networkId &&
      !redirectRoutes.includes(router.pathname)
    ) {
      router.replace(ROUTES.Welcome);
    }
  };

  if (isConnected)
    return (
      <>
        <AccountSelect
          accountConnected={accountConnected}
          accounts={accounts}
          setAccount={_setAccount}
          disconnectWallet={disconnectWallet}
        />

        <NetworkSelect currentChain={network} onChange={handleNetworkChange} />
        <AccountConfirmationModal
          isOpen={isOpen}
          onConfirm={() => {
            confirmedAccount && setAccount(confirmedAccount);
            router.replace(ROUTES.Welcome);
          }}
          closeModal={closeModal}
        />
      </>
    );

  return (
    <>
      <StyledConnectButton
        ref={refButton}
        isLoading={recentlyClicked}
        onClick={() => setDisplayModalWallet(true)}
      >
        Connect
      </StyledConnectButton>
      <ModalWallet
        wallets={wallets}
        open={displayModalWallet}
        handleClose={() => setDisplayModalWallet(false)}
        connectWallet={connectWallet}
        onClose={() => setDisplayModalWallet(false)}
      />
    </>
  );
};
