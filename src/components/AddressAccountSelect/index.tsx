import { InputLabel, MenuItem, Select } from "@mui/material";

import { useApiContext } from "@/context/useApiContext";
import useSetDefaultItem from "@/hooks/useSetDefaultFirstItem";

import { AccountAvatar } from "./AccountAvatar";

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

export function AddressAccountSelect({
  label = "My Accounts",
  value,
  onChange,
}: Props) {
  const { accounts } = useApiContext();

  // Set first item as default
  useSetDefaultItem({
    value,
    setValue: onChange,
    options: accounts,
    getValue: (account) => account.address,
  });

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        renderValue={(selected) => {
          if (!accounts) return;

          const account = accounts.find(
            (account) => account.address === selected
          );
          return <AccountAvatar address={account.address} />;
        }}
      >
        {accounts?.map((account) => (
          <MenuItem key={account.address} value={account.address}>
            <AccountAvatar address={account.address} />
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
