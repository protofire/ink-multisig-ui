export function truncateAddress(
  value: string | undefined,
  sideLength = 6
): string {
  return value
    ? value.length > sideLength * 2
      ? `${value.substring(0, sideLength)}...${value.substring(
          value.length - sideLength
        )}`
      : value
    : "";
}
