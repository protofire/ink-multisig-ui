import { AbiMessage } from "@polkadot/api-contract/types";
import { createContext, useContext } from "react";

import { ManagerActiveStep } from "@/components/StepperSignersAccount/useManagerActiveStep";
import { AbiSource } from "@/domain";
import { UseFormReturn } from "@/hooks/useForm";
import { UseMetadata } from "@/hooks/useParseMetadataField";

import { UseArgValuesReturn } from "../ArgumentForm/useArgValues";

export interface TxBuilderForm {
  address: string;
  metadataSource?: AbiSource;
  selectedAbiIdentifier: AbiMessage["identifier"] | undefined;
  dataArgsU8a: UseArgValuesReturn["inputDataU8a"];
}

export interface TxBuilderContextData {
  metadataManager: UseMetadata;
  inputFormManager: UseFormReturn<TxBuilderForm>;
  managerStep: ManagerActiveStep;
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
