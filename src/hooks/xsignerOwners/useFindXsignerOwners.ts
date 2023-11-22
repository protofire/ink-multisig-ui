import { useEffect, useState } from "react";
import { ArrayOneOrMore } from "useink/dist/core";

import { graphSquidClient } from "@/config/squid";
import { MultisigData } from "@/domain/repositores/IXsignerOwnersRepository";
import { Owner } from "@/domain/SignatoriesAccount";
import { XsignerOwnersRepository } from "@/services/squid/XsignerOwnersRepository";
import { customReportError } from "@/utils/error";

interface Props {
  address: string | undefined;
  walletName: string;
}

type MultisigDataFormatted = Pick<MultisigData, "threshold"> & {
  owners: ArrayOneOrMore<Owner>;
  name: string;
  address: string;
};

const squidClient = graphSquidClient.getCurrentApolloClient();
const repository = new XsignerOwnersRepository(squidClient);

export function useFindXsignerOwners({ address, walletName }: Props) {
  const [data, setData] = useState<MultisigDataFormatted | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await repository.getMultisigByAddress(address as string);
        if (result) {
          setData({
            address: result.addressSS58,
            name: walletName,
            threshold: result.threshold,
            owners: result.owners.map((address, index) => ({
              address,
              name: `Signer ${index + 1}`,
            })) as ArrayOneOrMore<Owner>,
          });
        }
      } catch (err) {
        setError(customReportError(err));
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchData();
    }
  }, [address, walletName]);

  return {
    data,
    isLoading: loading,
    error,
  };
}
