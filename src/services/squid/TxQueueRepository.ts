import gql from "graphql-tag";

import {
  ITxQueueRepository,
  MyQueryResponse,
  MyQueryVariables,
  TxType,
} from "@/domain/repositores/ITxQueueRepository";

import { GraphClient } from "./GraphClient";

const FETCH_QUEUE = gql`
  query MyQuery($address: String!) {
    txes(
      where: { multisig: { addressSS58_eq: $address } }
      orderBy: creationTimestamp_ASC
    ) {
      ... on Transaction {
        __typename
        id
        txId
        proposer
        proposalTxHash
        executionTxHash
        contractAddress
        args
        selector
        value
        status
        error
        approvalCount
        rejectionCount
        approvals {
          approver
        }
        rejections {
          rejector
        }
        creationTimestamp
        creationBlockNumber
        lastUpdatedTimestamp
        lastUpdatedBlockNumber
        externalTransactionData {
          args
          methodName
        }
      }
      ... on Transfer {
        __typename
        id
        from
        to
        transferType
        value
        tokenAddress
        tokenDecimals
        creationTimestamp
        creationBlockNumber
      }
    }
  }
`;

export class TxQueueRepository implements ITxQueueRepository {
  constructor(private client: GraphClient) {}

  async getQueue(address: string): Promise<TxType[] | null> {
    const client = this.client.getCurrentApolloClient();
    const { data } = await client.query<MyQueryResponse, MyQueryVariables>({
      query: FETCH_QUEUE,
      variables: { address },
    });
    return data?.txes || null;
  }
}
