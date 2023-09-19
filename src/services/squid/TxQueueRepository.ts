import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import gql from "graphql-tag";

import {
  ITxQueueRepository,
  MyQueryResponse,
  MyQueryVariables,
  TxQueueData,
} from "@/domain/repositores/ITxQueueRepository";

const FETCH_QUEUE = gql`
  query MyQuery($address: String!) {
    multisigs(where: { addressSS58_eq: $address }) {
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
        value
      }
      addressHex
      owners
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
