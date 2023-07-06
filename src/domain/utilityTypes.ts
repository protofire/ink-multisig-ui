/**
 * Utility type that enforces an array to have at least one element.
 *
 * @template T The type of elements in the array.
 *
 * @example
 * let arr: ArrayOneOrMore<number>;
 * arr = [1]; // This is fine
 * arr = []; // TypeScript error: Type '[]' is not assignable to type 'ArrayOneOrMore<number>'
 */
export type ArrayOneOrMore<T> = [T, ...T[]];

/**
 * Utility type that performs a "spread" operation between two types.
 * It creates a new type that has all properties of `R` and all properties of `L` that are not in `R`.
 *
 * @template L The type to pick properties from.
 * @template R The type to be spread.
 *
 * @example
 * type Foo = { a: number; b: string; };
 * type Bar = { b: number; c: boolean; };
 * type Result = SimpleSpread<Foo, Bar>;
 * // Result is now { b: number; c: boolean; a: number; }
 */
export type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;
