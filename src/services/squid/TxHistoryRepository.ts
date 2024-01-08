import gql from "graphql-tag";

import {
  ITxHistoryRepository,
  MyQueryResponse,
  MyQueryVariables,
} from "@/domain/repositores/ITxHistoryRepository";
import { FullTxProposed } from "@/domain/TransactionProposed";

import { GraphClient } from "./GraphClient";
import { rawToFullTxProposed } from "./transformers/toTransactionProposed";

const FETCH_HISTORY = gql`
  query TxHistory($address: String!) {
    txes(
      where: { multisig: { addressSS58_eq: $address } }
      orderBy: creationTimestamp_DESC
    ) {
      ... on Transaction {
        __typename
        approvalCount
        approvals {
          approvalBlockNumber
          approvalTimestamp
          approver
          id
        }
        args
        contractAddress
        creationBlockNumber
        creationTimestamp
        error
        executionTxHash
        externalTransactionData {
          args
          creationTimestamp
          id
          inUse
          methodName
        }
        id
        lastUpdatedBlockNumber
        lastUpdatedTimestamp
        proposalTxHash
        proposer
        rejectionCount
        rejections {
          id
          rejectionBlockNumber
          rejectionTimestamp
          rejector
        }
        selector
        status
        txId
        value
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

export class TxHistoryRepository implements ITxHistoryRepository {
  constructor(private client: GraphClient) {}

  async getHistory(address: string): Promise<FullTxProposed[] | null> {
    const client = this.client.getCurrentApolloClient();
    const { data } = await client.query<MyQueryResponse, MyQueryVariables>({
      query: FETCH_HISTORY,
      variables: { address },
      fetchPolicy: "network-only",
    });
    return data.txes
      .filter((transactions) => transactions.status !== "PROPOSED")
      .map((transactions) => rawToFullTxProposed(transactions));
  }
}
