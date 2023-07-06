import { AddressAccountSelect } from "@/components/AddressAccountSelect";
import { ArgumentComponentProps } from "@/domain/substrateInputTypes";

type ArgAccountSelectProps = ArgumentComponentProps<string>;

export function ArgAccountSelect({ id, ...props }: ArgAccountSelectProps) {
  return <AddressAccountSelect label={id} {...props} />;
}
