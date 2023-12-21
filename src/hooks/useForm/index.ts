import { useMemo, useState } from "react";

export type ValidationFn<I, K extends keyof I> = (
  value: I[K]
) => string | void | Promise<string | void>;

type ValidationMap<T> = {
  [K in keyof T]?: Array<ValidationFn<T, K>>;
};

interface FormState<I> {
  values: I;
  errors: Record<keyof I, string | null>;
  touched: Record<keyof I, boolean>;
  isLoading: boolean;
}

export interface UseFormReturn<T> {
  register: <K extends keyof T>(
    name: K,
    validations: Array<ValidationFn<T, K>>
  ) => {
    value: T[K];
    onChange: (e: React.BaseSyntheticEvent) => Promise<void>;
  };
  handleSubmit: (callback: (values: T) => void) => (e: React.FormEvent) => void;
  errors: Record<keyof T, string | null>;
  touched: Record<keyof T, boolean>;
  values: T;
  setValue: <K extends keyof T>(name: K, value: T[K]) => Promise<void>;
  isValid: boolean;
  isLoading: boolean;
  reset: (exceptions?: Partial<T>) => void;
}

export function useForm<T extends object>(initialValues: T): UseFormReturn<T> {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {} as Record<keyof T, string | null>,
    touched: {} as Record<keyof T, boolean>,
    isLoading: false,
  });

  const fieldValidations: ValidationMap<T> = {};

  const validateField = async <K extends keyof T>(name: K, value: T[K]) => {
    setFormState((prevState) => ({ ...prevState, isLoading: true }));
    const validations = fieldValidations[name];

    if (!validations) {
      setFormState((prevState) => ({ ...prevState, isLoading: false }));
      return null;
    }

    for (const validate of validations) {
      const validationResult = await validate(value);
      if (validationResult) {
        setFormState((prevState) => ({ ...prevState, isLoading: false }));
        return validationResult;
      }
    }
    setFormState((prevState) => ({ ...prevState, isLoading: false }));
    return null;
  };

  const reset = (exceptions?: Partial<T>) => {
    setFormState({
      values: {
        ...initialValues,
        ...exceptions,
      },
      errors: {} as Record<keyof T, string | null>,
      touched: {} as Record<keyof T, boolean>,
      isLoading: false,
    });
  };

  const isValid = useMemo(() => {
    const hasErrors = Object.values(formState.errors).some(
      (error) => error !== null
    );

    const allFieldsTouched = Object.values(formState.touched).every(
      (touched) => touched
    );

    return !hasErrors && allFieldsTouched;
  }, [formState.errors, formState.touched]);

  const register = <K extends keyof T>(
    name: K,
    validations: Array<ValidationFn<T, K>>
  ) => {
    fieldValidations[name] = validations;

    return {
      value: formState.values[name],
      onChange: async (e: React.BaseSyntheticEvent) => {
        const newValue = e.target.value;
        const error = await validateField(name, newValue);

        setFormState((prevState) => ({
          ...prevState,
          values: {
            ...prevState.values,
            [name]: newValue,
          },
          errors: {
            ...prevState.errors,
            [name]: error,
          },
          touched: {
            ...prevState.touched,
            [name]: true,
          },
        }));
      },
    };
  };

  const setValue = async <K extends keyof T>(name: K, value: T[K]) => {
    const error = await validateField(name, value);

    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: error,
      },
    }));
  };

  const handleSubmit = (callback: (values: T) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      if (!Object.values(formState.errors).some((error) => error !== null)) {
        callback(formState.values);
      }
    };
  };

  return {
    register,
    handleSubmit,
    errors: formState.errors,
    values: formState.values,
    touched: formState.touched,
    setValue,
    isValid,
    isLoading: formState.isLoading,
    reset,
  };
}
