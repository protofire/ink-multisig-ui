import gql from "graphql-tag";

import {
  ITxQueueRepository,
  MyQueryResponse,
  MyQueryVariables,
  TxQueueData,
} from "@/domain/repositores/ITxQueueRepository";

import { GraphClient } from "./GraphClient";

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
  constructor(private client: GraphClient) {}

  async getQueue(address: string): Promise<TxQueueData | null> {
    const client = this.client.getCurrentApolloClient();
    const { data } = await client.query<MyQueryResponse, MyQueryVariables>({
      query: FETCH_QUEUE,
      variables: { address },
    });

    return data?.multisigs[0] || null;
  }
}
