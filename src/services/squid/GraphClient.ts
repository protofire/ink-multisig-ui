import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import { squidConfig } from "@/config/squid";
import { INetworkRepository } from "@/domain/repositores/INetworkRepository";
import { ChainId } from "@/services/useink/types";

const API_SQUID_URL = "/api/graphql/";

export class GraphClient {
  clients: Record<ChainId, ApolloClient<NormalizedCacheObject>>;
  networkRepository: INetworkRepository;

  constructor(networkRepository: INetworkRepository) {
    this.networkRepository = networkRepository;
    this.clients = Object.keys(squidConfig).reduce((acc, chainId) => {
      acc[chainId as ChainId] = new ApolloClient({
        uri: `${API_SQUID_URL}${chainId}`,
        cache: new InMemoryCache(),
      });
      return acc;
    }, {} as Record<ChainId, ApolloClient<NormalizedCacheObject>>);
  }

  getClient(chain: ChainId): ApolloClient<NormalizedCacheObject> {
    if (chain in this.clients) {
      return this.clients[chain];
    } else {
      throw Error(`No configuration found for string: ${chain}`);
    }
  }

  getCurrentApolloClient(): ApolloClient<NormalizedCacheObject> {
    const chainSelected = this.networkRepository.getNetworkSelected();
    return this.getClient(chainSelected.id);
  }

  getCurrentNetwork(): ChainId {
    const chainSelected = this.networkRepository.getNetworkSelected();

    return chainSelected.id;
  }
}
