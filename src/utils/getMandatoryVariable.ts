export function getMandatoryVariable(variableName: string) {
  const value = process.env[variableName];
  if (typeof value === "undefined") {
    throw new Error(`Environment variable ${variableName} must be defined`);
  }

  return value;
}
