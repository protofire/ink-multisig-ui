import { createContext, useContext } from "react";

import { AbiSource } from "@/domain";
import { UseFormReturn } from "@/hooks/useForm";
import { UseMetadata } from "@/hooks/useParseMetadataField";

export interface TxBuilderForm extends Record<string, unknown> {
  address: string;
  metadataSource?: AbiSource;
}

export interface TxBuilderContextData {
  metadataManager: UseMetadata;
  inputFormManager: UseFormReturn<TxBuilderForm>;
}

export const TxBuilderContext = createContext({} as TxBuilderContextData);

export function useTxBuilderContext() {
  const context = useContext(TxBuilderContext);
  if (!context) {
    throw new Error(
      "useTxBuilderContext must be used within the context Provider"
    );
  }
  return context;
}
