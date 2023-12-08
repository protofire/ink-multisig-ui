import { Abi, AbiMessage } from "@/services/substrate/types";

export interface Validation {
  isError?: boolean;
  isSuccess?: boolean;
  isTouched?: boolean;
  isValid?: boolean;
  isWarning?: boolean;
  message?: React.ReactNode;
}

export interface Metadata {
  source?: Record<string, unknown>;
  name: string;
  value?: Abi;
  isSupplied: boolean;
}

export interface AbiSource {
  [key: string]: unknown;
  source: { language: string; hash: string };
  spec: {
    messages: AbiMessage[];
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAbiSource(obj: any): obj is AbiSource {
  return (
    obj &&
    typeof obj === "object" &&
    obj.source &&
    typeof obj.source === "object" &&
    typeof obj.source.language === "string" &&
    typeof obj.source.hash === "string" &&
    obj.spec &&
    typeof obj.spec === "object" &&
    Array.isArray(obj.spec.messages)
  );
}

export type MetadataState = Metadata & Validation;
