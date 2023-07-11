import { ArgumentComponentProps } from "@/domain/substrateInputTypes";
import { Registry, TypeDef, TypeDefInfo } from "@/services/substrate/types";

import { ArgAccountSelect } from "./ArgAccountSelect";
import { Enum } from "./ArgEnum";
import { ArgTextField } from "./ArgTextField";
import { InputBn } from "./InputBn";
import { OptionArgument } from "./OptionArgument";

type ArgComponentPropsTypes =
  | ArgumentComponentProps<Record<string, unknown>>
  | ArgumentComponentProps<unknown>
  | ArgumentComponentProps<unknown[]>;

const typeToComponentMap = {
  [TypeDefInfo.Option]: OptionArgument,
  [TypeDefInfo.Enum]: Enum,
  // [TypeDefInfo.Tuple]: Tuple,
  // [TypeDefInfo.Vec]: Vector,
  // [TypeDefInfo.VecFixed]: VectorFixed,
};

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

/**
 * Create and return React components based on the provided substrate data type.
 *
 * The class has a static `createComponent` method that takes a record, a definition type,
 * and a nesting number as arguments. This method decides which React component to return
 * based on the provided definition type.
 */
export class FactoryInputArgument {
  static subComponents(
    registry: Registry,
    typeDef: TypeDef,
    nestingNumber: number
  ): React.ComponentType<ArgumentComponentProps<unknown>>[] {
    if (!typeDef.sub) {
      throw new Error("Cannot retrieve subComponent array for type definition");
    }

    return (Array.isArray(typeDef.sub) ? typeDef.sub : [typeDef.sub]).map(
      (subTypeDef) => this.createComponent(registry, subTypeDef, nestingNumber)
    );
  }

  static createComponent(
    registry: Registry,
    type: TypeDef,
    nestingNumber = 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): React.ComponentType<ArgumentComponentProps<any>> {
    if (type.info === TypeDefInfo.Compact) {
      return this.createComponent(registry, type.sub as TypeDef);
    }

    if (type.info in typeToComponentMap) {
      const components = this.subComponents(registry, type, nestingNumber);
      const ArgComponent =
        typeToComponentMap[type.info as keyof typeof typeToComponentMap];

      const Component = (
        props: React.PropsWithChildren<ArgComponentPropsTypes>
      ) => <ArgComponent components={components} {...props} typeDef={type} />;

      Component.displayName = ArgComponent.name;
      return Component;
    }

    if (type.info === TypeDefInfo.Si) {
      return this.createComponent(
        registry,
        registry.lookup.getTypeDef(type.type as `Lookup${number}`),
        nestingNumber
      );
    }

    if (type.type in basicTypeToComponentMap) {
      return basicTypeToComponentMap[
        type.type as keyof typeof basicTypeToComponentMap
      ];
    }

    return ArgTextField;
  }
}
