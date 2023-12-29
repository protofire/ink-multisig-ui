import gql from "graphql-tag";

import {
  IXsignerOwnersRepository,
  MultisigData,
  MyQueryResponse,
  MyQueryVariables,
} from "@/domain/repositores/IXsignerOwnersRepository";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";

import { GraphClient } from "./GraphClient";
import { multisigRawToSignatoriesAccount } from "./transformers/toSignatoriesAccount";

const FETCH_MULTISIG = gql`
  query MultisigsByAddress($address: String!) {
    multisigs(where: { addressSS58_eq: $address }) {
      owners
      threshold
      addressSS58
      addressHex
    }
  }
`;

const FETCH_MULTISIGS_BY_OWNER = gql`
  query MultisigsWhereOwnersIncludes($address: [String!]!) {
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

  async getMultisigsByOwner(
    address: string
  ): Promise<SignatoriesAccount[] | null> {
    const client = this.client.getCurrentApolloClient();
    const networkId = this.client.getCurrentNetwork();

    const { data } = await client.query<MyQueryResponse, MyQueryVariables>({
      query: FETCH_MULTISIGS_BY_OWNER,
      variables: {
        address: [address],
      },
    });

    if (!data?.multisigs) return null;

    return data.multisigs.map((multisig) =>
      multisigRawToSignatoriesAccount(multisig, networkId)
    );
  }
}
