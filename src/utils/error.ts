import { IS_DEVELOPMENT } from "@/config/app";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export function customReportError(error: unknown): string {
  const errorMessage = getErrorMessage(error);

  if (IS_DEVELOPMENT) console.error(error);

  return errorMessage;
}

/** Creates a console error message to warn that a function is not implemented.
 *
 * @example
 * const myFunction = () => createNotImplementedWarning('myFunction');
 */
export const createNotImplementedWarning = (methodName: string): void => {
  console.error(`${methodName} is not implemented`);
};
