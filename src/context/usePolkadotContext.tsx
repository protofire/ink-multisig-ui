import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWallet } from "useink";
import { ChainId } from "useink/dist/chains";

import { CHAINS_ALLOWED } from "@/config/chain";
import { SetState } from "@/domain/utilityReactTypes";
import { WalletAccount } from "@/services/useink/types";
import { createNotImplementedWarning } from "@/utils/error";

interface PolkadotContextProps {
  network: ChainId | undefined;
  setNetwork: SetState<ChainId | undefined>;
  accounts: WalletAccount[] | undefined;
  accountConnected: WalletAccount | undefined;
}

const PolkadotContext = createContext<PolkadotContextProps>({
  network: undefined,
  setNetwork: () => createNotImplementedWarning("setNetwork"),
  accounts: undefined,
  accountConnected: undefined,
});

export const PolkadotContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [networkId, setNetworkId] = useState<ChainId | undefined>();
  const { accounts, account } = useWallet();

  //TODO replace with at network selector
  useEffect(() => {
    if (networkId) return;

    // set Rococo by default
    setNetworkId(CHAINS_ALLOWED[0].id);
  }, [networkId]);

  return (
    <PolkadotContext.Provider
      value={{
        network: networkId,
        setNetwork: setNetworkId,
        accounts,
        accountConnected: account,
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
