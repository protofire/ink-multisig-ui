import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAllWallets, useWallet } from "useink";
import { ChainId } from "useink/dist/chains";

import { DEFAULT_CHAIN } from "@/config/chain";
import { SetState } from "@/domain/utilityReactTypes";
import { Wallet, WalletAccount } from "@/services/useink/types";
import { createNotImplementedWarning } from "@/utils/error";

interface PolkadotContextProps {
  network: ChainId | undefined;
  setNetwork: SetState<ChainId | undefined>;
  accounts: WalletAccount[] | undefined;
  accountConnected: WalletAccount | undefined;
  wallets: Wallet[];
  isConnected: boolean;
  connectWallet: (walletName: string) => void;
  disconnectWallet: () => void;
  setAccount: (account: WalletAccount) => void;
}

const PolkadotContext = createContext<PolkadotContextProps>({
  network: undefined,
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
  const [networkId, setNetworkId] = useState<ChainId | undefined>();
  const { accounts, account, connect, disconnect, isConnected, setAccount } =
    useWallet();
  const walletList = useAllWallets();

  useEffect(() => {
    if (networkId) return;

    // set default chain according environment
    setNetworkId(DEFAULT_CHAIN);
  }, [networkId]);

  return (
    <PolkadotContext.Provider
      value={{
        network: networkId,
        setNetwork: setNetworkId,
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
