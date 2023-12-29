import React, { createContext, PropsWithChildren, useContext } from "react";

import { IAddressBookRepository } from "@/domain/repositores/IAddressBookRepository";
import { IAssetRepository } from "@/domain/repositores/IAssetRepository";
import { INetworkRepository } from "@/domain/repositores/INetworkRepository";
import { ITxQueueRepository } from "@/domain/repositores/ITxQueueRepository";
import { IXsignerOwnersRepository } from "@/domain/repositores/IXsignerOwnersRepository";
import { IXsignerSelectedRepository } from "@/domain/repositores/IXsignerSelectedRepository";
import { MyDatabase } from "@/services/localDB";
import { AddressBookRepository } from "@/services/localDB/AddressBookRepository";
import { AssetRepository } from "@/services/localDB/AssetRepository";
import { SignatoriesAccountDatabase } from "@/services/localDB/SignatoriesAccountRepository";
import { XsignerSelectedRepository } from "@/services/localDB/XsignerSelectedRepository";
import { LocalStorageNetworkRepository } from "@/services/LocalStorageNetworkRepository";
import { GraphClient } from "@/services/squid/GraphClient";
import { TxHistoryRepository } from "@/services/squid/TxHistoryRepository";
import { TxQueueRepository } from "@/services/squid/TxQueueRepository";
import { XsignerOwnersRepository } from "@/services/squid/XsignerOwnersRepository";

interface DbContext {
  networkRepository: INetworkRepository;
  signatoriesAccountRepository: SignatoriesAccountDatabase;
  xsignerSelectedRepository: IXsignerSelectedRepository;
  xsignerOwnersRepository: IXsignerOwnersRepository;
  addressBookRepository: IAddressBookRepository;
  assetRepository: IAssetRepository;
  txQueueRepository: ITxQueueRepository;
  txHistoryRepository: TxHistoryRepository;
}

const signatoriesAccountRepository = new SignatoriesAccountDatabase(
  new MyDatabase()
);
const xsignerSelectedRepository = new XsignerSelectedRepository();
const addressBookRepository = new AddressBookRepository();
const assetRepository = new AssetRepository();
const networkRepository = new LocalStorageNetworkRepository();
const graphSquidClient = new GraphClient(networkRepository);
const xsignerOwnersRepository = new XsignerOwnersRepository(graphSquidClient);
const txQueueRepository = new TxQueueRepository(graphSquidClient);
const txHistoryRepository = new TxHistoryRepository(graphSquidClient);

const DbContext = createContext<DbContext>({
  networkRepository,
  signatoriesAccountRepository,
  xsignerSelectedRepository,
  xsignerOwnersRepository,
  addressBookRepository,
  assetRepository,
  txQueueRepository,
  txHistoryRepository,
});

export const LocalDbProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DbContext.Provider
      value={{
        networkRepository,
        signatoriesAccountRepository,
        xsignerSelectedRepository,
        xsignerOwnersRepository,
        addressBookRepository,
        assetRepository,
        txQueueRepository,
        txHistoryRepository,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};

export const useLocalDbContext = () => useContext(DbContext);
