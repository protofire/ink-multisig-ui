import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";

export const isValidAddress = (address: string | undefined) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
};

export const genRanHex: (size?: number) => `0x${string}` = (size = 32) =>
  `0x${[...Array<string>(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("")}`;

const adjectives = [
  "Amazing",
  "Humble",
  "Graceful",
  "Daring",
  "Unique",
  "Mysterious",
  "Elegant",
  "Charming",
  "Vivid",
  "Bold",
];

const nouns = [
  "Journey",
  "Sunset",
  "Galaxy",
  "Ocean",
  "Mountain",
  "Forest",
  "Desert",
  "River",
  "Sky",
  "Island.",
];

let counter = 0;

export const generateRandomWalletName = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const uniqueNumber = counter++;

  return `${adjective}-${noun}-${uniqueNumber}-wallet`;
};
