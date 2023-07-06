import { ArgumentComponentProps } from "@/domain/substrateInputTypes";
import { Registry, TypeDef, TypeDefInfo } from "@/services/substrate/types";

import { ArgAccountSelect } from "./inputs/ArgAccountSelect";
import { ArgTextField } from "./inputs/ArgTextField";
import { InputBn } from "./inputs/InputBn";

const basicTypeToComponentMap = {
  AccountId: ArgAccountSelect,
  Address: ArgAccountSelect,
  BN: InputBn,
  u8: InputBn,
  i8: InputBn,
  u32: InputBn,
  i32: InputBn,
  u64: InputBn,
  i64: InputBn,
  u128: InputBn,
  i128: InputBn,
};

export function findComponent(
  registry: Registry,
  type: TypeDef,
  nestingNumber = 0 // counts the depth of nested components
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): React.ComponentType<ArgumentComponentProps<any>> {
  if (type.info === TypeDefInfo.Compact) {
    return findComponent(registry, type.sub as TypeDef);
  }

  if (type.type in basicTypeToComponentMap) {
    return basicTypeToComponentMap[
      type.type as keyof typeof basicTypeToComponentMap
    ];
  }

  return ArgTextField;
}
