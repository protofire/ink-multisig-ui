import { config } from "@/services/squid/squidConfig";
import { ChainId } from "@/services/useink/types";
import { getMandatoryVariable } from "@/utils/getMandatoryVariable";

export const squidConfig: Partial<Record<ChainId, string>> = config;

export const NEXT_DB_USER = getMandatoryVariable("NEXT_DB_USER");
export const NEXT_DB_PASS = getMandatoryVariable("NEXT_DB_PASS");
export const NEXT_DB_HOST = getMandatoryVariable("NEXT_DB_HOST");
export const NEXT_DB_PORT = process.env.NEXT_DB_PORT
  ? parseInt(process.env.NEXT_DB_PORT)
  : 23798;
export const NEXT_DB_NAME = process.env.NEXT_DB_NAME || "squid";
