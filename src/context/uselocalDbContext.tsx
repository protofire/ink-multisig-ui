import React, { createContext, PropsWithChildren, useContext } from "react";

import { IAddressBookRepository } from "@/domain/repositores/IAddressBookRepository";
import { INetworkRepository } from "@/domain/repositores/INetworkRepository";
import { IXsignerSelectedRepository } from "@/domain/repositores/IXsignerSelectedRepository";
import { MyDatabase } from "@/services/localDB";
import { AddressBookRepository } from "@/services/localDB/AddressBookRepository";
import { SignatoriesAccountDatabase } from "@/services/localDB/SignatoriesAccountRepository";
import { XsignerSelectedRepository } from "@/services/localDB/XsignerSelectedRepository";
import { LocalStorageNetworkRepository } from "@/services/LocalStorageNetworkRepository";

interface DbContext {
  networkRepository: INetworkRepository;
  signatoriesAccountRepository: SignatoriesAccountDatabase;
  xsignerSelectedRepository: IXsignerSelectedRepository;
  addressBookRepository: IAddressBookRepository;
}

const signatoriesAccountRepository = new SignatoriesAccountDatabase(
  new MyDatabase()
);
const xsignerSelectedRepository = new XsignerSelectedRepository();
const addressBookRepository = new AddressBookRepository();
export const networkRepository = new LocalStorageNetworkRepository();

const DbContext = createContext<DbContext>({
  networkRepository,
  signatoriesAccountRepository,
  xsignerSelectedRepository,
  addressBookRepository,
});

export const LocalDbProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DbContext.Provider
      value={{
        networkRepository,
        signatoriesAccountRepository,
        xsignerSelectedRepository,
        addressBookRepository,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};

export const useLocalDbContext = () => useContext(DbContext);
