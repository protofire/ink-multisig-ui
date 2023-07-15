import { MenuItem, Select } from "@mui/material";

import { ValidFormField } from "@/domain/substrateInputTypes";
import { SimpleSpread } from "@/domain/utilityTypes";

type Props = SimpleSpread<
  React.HTMLAttributes<HTMLDivElement>,
  ValidFormField<boolean>
>;

export function Bool({ value, onChange, ...props }: Props) {
  return (
    <>
      <Select value={value.toString()} onChange={onChange} {...props}>
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Select>
    </>
  );
}
