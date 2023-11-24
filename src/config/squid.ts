import { config } from "@/services/squid/squidConfig";
import { ChainId } from "@/services/useink/types";

export const squidConfig: Partial<Record<ChainId, string>> = config;
