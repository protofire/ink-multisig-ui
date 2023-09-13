import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import gql from "graphql-tag";

import {
  ITxQueueRepository,
  MyQueryResponse,
  MyQueryVariables,
  TxQueueData,
} from "@/domain/repositores/ITxQueueRepository";

const FETCH_QUEUE = gql`
  query MyQuery {
    multisigs(
      where: {
        addressHex_eq: "0xcd56a6dbfdffb4207042d465c03c8570cb0d7ad0bcf10c6b4735c8710b348db5"
      }
    ) {
      addressSS58
      transactions(orderBy: txId_ASC) {
        selector
        args
        contractAddress
        proposer
        rejectionCount
        approvalCount
        status
        lastUpdatedTimestamp
      }
      addressHex
    }
  }
`;

export class TxQueueRepository implements ITxQueueRepository {
  constructor(private client: ApolloClient<NormalizedCacheObject>) {}

  async getQueue(address: string): Promise<TxQueueData | null> {
    const { data } = await this.client.query<MyQueryResponse, MyQueryVariables>(
      {
        query: FETCH_QUEUE,
        variables: { address },
      }
    );

    return data?.multisigs[0] || null;
  }
}
