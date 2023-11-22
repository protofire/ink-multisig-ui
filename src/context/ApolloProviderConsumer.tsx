import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

import { graphSquidClient } from "@/config/squid";

export const ApolloProviderConsumer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const squidClient = graphSquidClient.getCurrentApolloClient();

  return <ApolloProvider client={squidClient}>{children}</ApolloProvider>;
};
