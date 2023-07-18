import { ApiPromise } from "@polkadot/api";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApi, useWallet } from "useink";
import { ChainId } from "useink/dist/chains";

import { CHAINS_ALLOWED } from "@/config/chain";
import { WalletAccount } from "@/domain/WalletAccount";

interface PolkadotContextProps {
  network: ChainId | undefined;
  setNetwork: React.Dispatch<React.SetStateAction<ChainId | undefined>>;
  apiPromise: ApiPromise | undefined;
  accounts: WalletAccount[] | undefined;
}

const PolkadotContext = createContext<PolkadotContextProps | undefined>(
  undefined
);

export const PolkadotContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [networkId, setNetworkId] = useState<ChainId | undefined>();
  const wallet = useWallet();
  const apiProvider = useApi(networkId);

  const { accounts } = wallet;
  const apiPromise = apiProvider?.api;

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
        apiPromise,
        accounts,
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
