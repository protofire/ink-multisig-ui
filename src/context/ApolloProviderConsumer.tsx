import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode, useMemo } from "react";

import { DEFAULT_CHAIN } from "@/config/chain";

import { usePolkadotContext } from "./usePolkadotContext";

const API_SQUID_URL = "/api/graphql/";

export const ApolloProviderConsumer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { network = DEFAULT_CHAIN } = usePolkadotContext();
  const squidClient = useMemo(
    () =>
      new ApolloClient({
        uri: `${API_SQUID_URL}${network}`,
        cache: new InMemoryCache(),
      }),
    [network]
  );
  return <ApolloProvider client={squidClient}>{children}</ApolloProvider>;
};
