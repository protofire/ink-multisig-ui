import { useMemo } from "react";

import { AddressAccountSelect } from "@/components/AddressAccountSelect";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { ArgumentComponentProps } from "@/domain/substrateInputTypes";

type ArgAccountSelectProps = ArgumentComponentProps<string>;

export function ArgAccountSelect({ ...props }: ArgAccountSelectProps) {
  const { accounts } = usePolkadotContext();
  const options = useMemo(
    () =>
      accounts
        ? accounts.map((account) => ({
            address: account.address,
            type: "Accounts",
          }))
        : [],
    [accounts]
  );

  return <AddressAccountSelect options={options} {...props} />;
}
