import { useEffect, useState } from "react";
import { ArrayOneOrMore } from "useink/dist/core";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { MultisigData } from "@/domain/repositores/IXsignerOwnersRepository";
import { Owner } from "@/domain/SignatoriesAccount";
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

export function useFindXsignerOwners({ address, walletName }: Props) {
  const [data, setData] = useState<MultisigDataFormatted | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { xsignerOwnersRepository } = useLocalDbContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await xsignerOwnersRepository.getMultisigByAddress(
          address as string
        );
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
  }, [address, walletName, xsignerOwnersRepository]);

  return {
    data,
    isLoading: loading,
    error,
  };
}
