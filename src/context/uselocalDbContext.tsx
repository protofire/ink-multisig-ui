import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { MyDatabase } from "@/services/localDB";
import { SignatoriesAccountDatabase } from "@/services/localDB/SignatoriesAccountRepository";

interface DbContext {
  signatoriesAccountRepository?: SignatoriesAccountDatabase;
}

const DbContext = createContext<DbContext>({});

export const LocalDbProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [signatoriesAccountRepository, setSignatoriesAccountRepository] =
    useState<SignatoriesAccountDatabase>();

  useEffect(() => {
    const db = new MyDatabase();

    setSignatoriesAccountRepository(new SignatoriesAccountDatabase(db));
  }, []);

  return (
    <DbContext.Provider value={{ signatoriesAccountRepository }}>
      {children}
    </DbContext.Provider>
  );
};

export const useLocalDbContext = () => useContext(DbContext);
