import React, { createContext, PropsWithChildren, useContext } from "react";

import { IXsignerSelectedRepository } from "@/domain/repositores/IXsignerSelectedRepository";
import { MyDatabase } from "@/services/localDB";
import { SignatoriesAccountDatabase } from "@/services/localDB/SignatoriesAccountRepository";
import { XsignerSelectedRepository } from "@/services/localDB/XsignerSelectedRepository";

interface DbContext {
  signatoriesAccountRepository: SignatoriesAccountDatabase;
  xsignerSelectedRepository: IXsignerSelectedRepository;
}

const signatoriesAccountRepository = new SignatoriesAccountDatabase(
  new MyDatabase()
);
const xsignerSelectedRepository = new XsignerSelectedRepository();

const DbContext = createContext<DbContext>({
  signatoriesAccountRepository,
  xsignerSelectedRepository,
});

export const LocalDbProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DbContext.Provider
      value={{ signatoriesAccountRepository, xsignerSelectedRepository }}
    >
      {children}
    </DbContext.Provider>
  );
};

export const useLocalDbContext = () => useContext(DbContext);
