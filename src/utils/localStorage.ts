const isString = (value: unknown) => typeof value === "string";

export const getLocalStorageState = <T>(
  nameItem: string,
  defaultValue: T
): T | null => {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  let state: T | null = null;

  try {
    const storedData: string | null = window.localStorage.getItem(nameItem);
    if (!storedData) {
      state = defaultValue;
    } else {
      try {
        state = JSON.parse(storedData as string);
      } catch {
        state = storedData as T;
      }
    }
  } catch (err) {
    console.error(err);
    state = defaultValue;
  }

  return state;
};

export const setLocalStorageState = <T extends string | object>(
  nameItem: string,
  value: T
) => {
  const _value = isString(value) ? (value as string) : JSON.stringify(value);

  window.localStorage.setItem(nameItem, _value);
};
