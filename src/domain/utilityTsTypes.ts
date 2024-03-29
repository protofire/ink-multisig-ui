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

export function createArrayOneOrMore<T>(elements: T | T[]): ArrayOneOrMore<T> {
  if (Array.isArray(elements) && elements.length === 0) {
    throw new Error("Array must have at least one element");
  }

  return Array.isArray(elements) ? (elements as ArrayOneOrMore<T>) : [elements];
}

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

/**
 * Represents a value of type T, or a falsy value (null or undefined).
 *
 * This type is useful when you want to allow a value to be either of a specific type,
 * or a falsy value.
 *
 * @template T - The type of the value.
 * @example
 * function greet(name: OrFalsy<string>): void {
 *   if (name) {
 *     console.log(`Hello, ${name}!`);
 *   } else {
 *     console.log('Hello, stranger!');
 *   }
 * }
 *
 * greet('Alice');  // Outputs: 'Hello, Alice!'
 * greet(null);     // Outputs: 'Hello, stranger!'
 * greet(undefined); // Outputs: 'Hello, stranger!'
 */
export type OrFalsy<T> = T | null | undefined;
