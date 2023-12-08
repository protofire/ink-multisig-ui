import { useMemo } from "react";

import { AddressAccountSelect } from "@/components/AddressAccountSelect";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { ArgumentComponentProps } from "@/domain/substrateInputTypes";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

type ArgAccountSelectProps = ArgumentComponentProps<string>;

export function ArgAccountSelect({ ...props }: ArgAccountSelectProps) {
  const { accounts } = usePolkadotContext();
  const { xSignerSelected } = useGetXsignerSelected();

  const options = useMemo(() => {
    const _options = accounts
      ? accounts.map((account) => ({
          address: account.address,
          type: "Accounts",
        }))
      : [];

    if (xSignerSelected) {
      _options.unshift({
        address: xSignerSelected.address,
        type: "Xsigner",
      });
    }

    return _options;
  }, [accounts, xSignerSelected]);

  return <AddressAccountSelect options={options} {...props} />;
}
