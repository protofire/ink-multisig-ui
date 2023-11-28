import gql from "graphql-tag";

import {
  IXsignerOwnersRepository,
  MultisigData,
  MyQueryResponse,
  MyQueryVariables,
} from "@/domain/repositores/IXsignerOwnersRepository";

import { GraphClient } from "./GraphClient";

const FETCH_MULTISIG = gql`
  query MyQuery($address: String!) {
    multisigs(where: { addressSS58_eq: $address }) {
      owners
      threshold
      addressSS58
      addressHex
    }
  }
`;

const FETCH_MULTISIGS_BY_OWNER = gql`
  query MyQuery($address: [String!]!) {
    multisigs(where: { owners_containsAny: $address }) {
      owners
      threshold
      addressSS58
      addressHex
    }
  }
`;

export class XsignerOwnersRepository implements IXsignerOwnersRepository {
  constructor(private client: GraphClient) {}

  async getMultisigByAddress(address: string): Promise<MultisigData | null> {
    const client = this.client.getCurrentApolloClient();

    const { data } = await client.query<MyQueryResponse, MyQueryVariables>({
      query: FETCH_MULTISIG,
      variables: { address },
    });

    return data?.multisigs[0] || null;
  }

  async getMultisigsByOwner(address: string): Promise<MultisigData[] | null> {
    const client = this.client.getCurrentApolloClient();

    const { data } = await client.query<MyQueryResponse, MyQueryVariables>({
      query: FETCH_MULTISIGS_BY_OWNER,
      variables: {
        address: [address],
      },
    });

    return data?.multisigs || null;
  }
}
