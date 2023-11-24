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
import { formatAddressForNetwork } from "@/utils/blockchain";
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
  const [formattedAccounts, setFormattedAccounts] = useState<
    WalletAccount[] | undefined
  >([]);
  const [formattedAccount, setFormattedAccount] = useState<
    WalletAccount | undefined
  >();

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

  const setAccountConnected = (account: WalletAccount) => {
    const formattedAccount = {
      ...account,
      address: formatAddressForNetwork(account.address, ""),
    };
    setAccount(formattedAccount);
  };

  useEffect(() => {
    if (!accounts || !networkId) return;

    const formattedAccounts = accounts.map((account) => ({
      ...account,
      address: formatAddressForNetwork(account.address, networkId),
    }));
    setFormattedAccounts(formattedAccounts);
  }, [accounts, networkId]);

  useEffect(() => {
    if (!account || !networkId) return;

    const formattedAccount = {
      ...account,
      address: formatAddressForNetwork(account.address, networkId),
    };

    setFormattedAccount(formattedAccount);
  }, [account, networkId]);

  return (
    <PolkadotContext.Provider
      value={{
        network: networkId,
        setNetwork: setCurrentChain,
        accounts: formattedAccounts,
        accountConnected: formattedAccount,
        wallets: walletList,
        connectWallet: connect,
        disconnectWallet: disconnect,
        isConnected,
        setAccount: setAccountConnected,
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
