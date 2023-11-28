import gql from "graphql-tag";

import {
  ITxQueueRepository,
  MyQueryResponse,
  MyQueryVariables,
  TxQueueType,
} from "@/domain/repositores/ITxQueueRepository";

import { GraphClient } from "./GraphClient";

const FETCH_QUEUE = gql`
  query MyQuery {
    txes(
      where: {
        multisig: {
          addressSS58_eq: "WVD2RehkWDtEovfmozEy9644WikGyJ7fFH7YUDSXgfBECXg"
        }
      }
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

  async getQueue(address: string): Promise<TxQueueType[] | null> {
    const client = this.client.getCurrentApolloClient();
    const { data } = await client.query<MyQueryResponse, MyQueryVariables>({
      query: FETCH_QUEUE,
      variables: { address },
    });
    return data?.txes || null;
  }
}
