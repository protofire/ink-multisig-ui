import React, { createContext, PropsWithChildren, useContext } from "react";

import { IAddressBookRepository } from "@/domain/repositores/IAddressBookRepository";
import { IXsignerSelectedRepository } from "@/domain/repositores/IXsignerSelectedRepository";
import { MyDatabase } from "@/services/localDB";
import { AddressBookRepository } from "@/services/localDB/AddressBookRepository";
import { SignatoriesAccountDatabase } from "@/services/localDB/SignatoriesAccountRepository";
import { XsignerSelectedRepository } from "@/services/localDB/XsignerSelectedRepository";

interface DbContext {
  signatoriesAccountRepository: SignatoriesAccountDatabase;
  xsignerSelectedRepository: IXsignerSelectedRepository;
  addressBookRepository: IAddressBookRepository;
}

const signatoriesAccountRepository = new SignatoriesAccountDatabase(
  new MyDatabase()
);
const xsignerSelectedRepository = new XsignerSelectedRepository();

const addressBookRepository = new AddressBookRepository();

const DbContext = createContext<DbContext>({
  signatoriesAccountRepository,
  xsignerSelectedRepository,
  addressBookRepository,
});

export const LocalDbProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DbContext.Provider
      value={{
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
