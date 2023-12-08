import { Asset } from "@/hooks/assets/useFetchAssets";

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
  asset: Asset,
  stringDecimals: number
): string => {
  const balance = asset.balance.replace(/,/g, "");
  const transformedBalance = (
    BigInt(balance) / BigInt(10 ** (asset.decimals - stringDecimals))
  ).toString();
  const strBalance =
    transformedBalance.slice(0, transformedBalance.length - stringDecimals) +
    "." +
    transformedBalance.slice(transformedBalance.length - stringDecimals);
  return strBalance;
};
