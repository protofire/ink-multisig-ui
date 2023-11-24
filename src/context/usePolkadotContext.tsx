import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAllWallets, useWallet } from "useink";
import { ChainId } from "useink/dist/chains";

import { DEFAULT_CHAIN } from "@/config/chain";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";
import { Wallet, WalletAccount } from "@/services/useink/types";
import { createNotImplementedWarning } from "@/utils/error";

import { useLocalDbContext } from "./uselocalDbContext";

interface PolkadotContextProps {
  network: ChainId;
  setNetwork: (chain: ChainId) => void;
  accounts: WalletAccount[] | undefined;
  accountConnected: WalletAccount | undefined;
  wallets: Wallet[];
  isConnected: boolean;
  connectWallet: (walletName: string) => void;
  disconnectWallet: () => void;
  setAccount: (account: WalletAccount) => void;
}

const PolkadotContext = createContext<PolkadotContextProps>({
  network: DEFAULT_CHAIN,
  accounts: undefined,
  accountConnected: undefined,
  wallets: [],
  isConnected: false,
  setNetwork: () => createNotImplementedWarning("setNetwork"),
  connectWallet: () => createNotImplementedWarning("connectWallet"),
  disconnectWallet: () => createNotImplementedWarning("disconnectWallet"),
  setAccount: () => createNotImplementedWarning("setAccount"),
});

export const PolkadotContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [networkId, setNetworkId] = useState<ChainId>(DEFAULT_CHAIN);
  const { accounts, account, connect, disconnect, isConnected, setAccount } =
    useWallet();
  const walletList = useAllWallets();
  const { networkRepository } = useLocalDbContext();

  const loadNetworkConnected = useCallback(() => {
    const networkSelected = networkRepository.getNetworkSelected();
    setNetworkId(networkSelected.id);
  }, [networkRepository]);

  useEffect(() => {
    loadNetworkConnected();
  }, [loadNetworkConnected]);

  const setCurrentChain = useCallback(
    async (chainId: ChainId) => {
      networkRepository.setNetworkSelected(chainId);
      setNetworkId(chainId);

      document.dispatchEvent(
        new CustomEvent(WalletConnectionEvents.networkChanged)
      );
    },
    [networkRepository]
  );

  return (
    <PolkadotContext.Provider
      value={{
        network: networkId,
        setNetwork: setCurrentChain,
        accounts,
        accountConnected: account,
        wallets: walletList,
        connectWallet: connect,
        disconnectWallet: disconnect,
        isConnected,
        setAccount,
      }}
    >
      {children}
    </PolkadotContext.Provider>
  );
};

export const usePolkadotContext = () => {
  const context = useContext(PolkadotContext);
  if (context === undefined) {
    throw new Error(
      "usePolkadotContext must be used within a PolkadotProvider"
    );
  }
  return context;
};
