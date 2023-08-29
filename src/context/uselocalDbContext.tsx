import React, { createContext, PropsWithChildren, useContext } from "react";

import { IAddressBookRepository } from "@/domain/repositores/IAddressBookRepository";
import { ITransactionQueueRepository } from "@/domain/repositores/ITransactionQueueRepository";
import { IXsignerSelectedRepository } from "@/domain/repositores/IXsignerSelectedRepository";
import { MyDatabase } from "@/services/localDB";
import { AddressBookRepository } from "@/services/localDB/AddressBookRepository";
import { SignatoriesAccountDatabase } from "@/services/localDB/SignatoriesAccountRepository";
import { TransactionQueueRepository } from "@/services/localDB/TransactionQueueRepository";
import { XsignerSelectedRepository } from "@/services/localDB/XsignerSelectedRepository";

interface DbContext {
  signatoriesAccountRepository: SignatoriesAccountDatabase;
  xsignerSelectedRepository: IXsignerSelectedRepository;
  addressBookRepository: IAddressBookRepository;
  transactionQueueRepository: ITransactionQueueRepository;
}

const signatoriesAccountRepository = new SignatoriesAccountDatabase(
  new MyDatabase()
);
const xsignerSelectedRepository = new XsignerSelectedRepository();

const addressBookRepository = new AddressBookRepository();

const transactionQueueRepository = new TransactionQueueRepository();

const DbContext = createContext<DbContext>({
  signatoriesAccountRepository,
  xsignerSelectedRepository,
  addressBookRepository,
  transactionQueueRepository,
});

export const LocalDbProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DbContext.Provider
      value={{
        signatoriesAccountRepository,
        xsignerSelectedRepository,
        addressBookRepository,
        transactionQueueRepository,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};

export const useLocalDbContext = () => useContext(DbContext);
