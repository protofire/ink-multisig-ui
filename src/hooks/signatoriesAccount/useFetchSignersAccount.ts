import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { ArrayOneOrMore } from "useink/dist/core";

import { Owner } from "@/domain/SignatoriesAccount";
import { customReportError } from "@/utils/error";

interface Props {
  address: string;
  walletName: string;
}

interface MultisigData {
  id: string;
  addressHex: string;
  addressSS58: string;
  owners: string[];
  threshold: number;
}

interface MyQueryResponse {
  multisigs: MultisigData[];
}

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

export function useFetchSignersAccount({ address, walletName }: Props) {
  const { loading, error, data } = useQuery<MyQueryResponse>(FETCH_MULTISIG, {
    variables: { address },
    skip: !address,
  });

  const formattedData = data?.multisigs[0]
    ? {
        address: data.multisigs[0].addressSS58,
        name: walletName,
        threshold: data.multisigs[0].threshold,
        owners: data.multisigs[0].owners.map((address, index) => ({
          address,
          name: `Signer ${index + 1}`,
        })) as ArrayOneOrMore<Owner>,
      }
    : undefined;

  return {
    data: formattedData,
    isLoading: loading,
    error: error ? customReportError(error) : null,
  };
}
