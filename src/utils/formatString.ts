import BigNumber from "bignumber.js";

export const truncateAddress = (
  value: string | undefined,
  sideLength = 6
): string => {
  return value
    ? value.length > sideLength * 2
      ? `${value.substring(0, sideLength)}...${value.substring(
          value.length - sideLength
        )}`
      : value
    : "";
};

/* ShorName longer n characters
 * Example:
 *   "POLKADOT CONTRACT WIZARD (POLKADOT-JS)"
 */
export const shortNameLonger = (name: string, maxCharacters = 11): string => {
  try {
    const [accountName, wallet] = extractAccountWallet(name);
    if (accountName.length <= maxCharacters) return name;
    const shortenedName = accountName
      .split(" ")
      .map((word, index) => (index === 0 ? word : word.charAt(0)))
      .join(" ");
    return `${shortenedName} ${wallet}`;
  } catch (e) {
    return name;
  }
};

/*
 * Separate name account and name label wallet, e.g:
 * "Account 1 (SUBWALLET-JS)"
 * ['Account 1', '(SUBWALLET-JS)]
 */
export const extractAccountWallet = (input: string): [string, string] => {
  const match = input.match(/^(.*?)( \([^)]*\))?$/);
  if (!match || !match[1]) {
    throw new Error(`Invalid input string: ${input}`);
  }
  const accountName = match[1].trim();
  const wallet = match[2] ?? "";
  return [accountName, wallet];
};

export const formatThreshold = ({
  threshold,
  owners,
}: {
  threshold: number | undefined;
  owners: number | undefined;
}) => {
  return `${threshold || "-"} / ${owners || "-"}`;
};

export const balanceToFixed = (
  tokenBalance: string,
  tokenDecimals: number
): string => {
  const balance = tokenBalance.replace(/,/g, "");
  return new BigNumber(balance).div(10 ** tokenDecimals).toFixed();
};

export const formatDate = (inputDate: Date) => {
  const date = new Date(inputDate);
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export function parseNativeBalance(input: string) {
  const match = input.match(/^([\d.]+)\s*([afpnμmc]?SBY)$/i);

  if (!match) {
    throw new Error("Invalid input format");
  }

  const value = new BigNumber(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "asby": // atto
      return value.div(new BigNumber(1e18)).toFixed();
    case "fsby": // femto
      return value.div(new BigNumber(1e15)).toFixed();
    case "psby": // pico
      return value.div(new BigNumber(1e12)).toFixed();
    case "nsby": // nano
      return value.div(new BigNumber(1e9)).toFixed();
    case "µsby": // micro
      return value.div(new BigNumber(1e6)).toFixed();
    case "msby": // mili
      return value.div(new BigNumber(1e3)).toFixed();
    case "csby": // centi
      return value.div(new BigNumber(1e2)).toFixed();
    case "sby":
      return value.toFixed();
    default:
      throw new Error("Invalid unit");
  }
}

export function emptyAsDash(value: string | undefined): string {
  return value ? value : "-";
}

export const hexStringToAscii = (hexString: string): string => {
  // Remove "0x" prefix if present
  if (hexString.startsWith("0x")) {
    hexString = hexString.slice(2);
  }

  // Ensure the hex string has an even number of characters
  if (hexString.length % 2 !== 0) {
    throw new Error("Hex string must have an even number of characters");
  }

  // Convert the hex string to a Buffer
  const buffer = Buffer.from(hexString, "hex");

  // Convert the Buffer to a string using UTF-8 encoding
  const asciiString = buffer.toString("utf8");

  return asciiString;
};
