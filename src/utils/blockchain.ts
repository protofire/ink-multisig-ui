import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { createHash, randomBytes } from "crypto";

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

export function hex_to_bytes(hex: string): number[] {
  const buffer = Buffer.from(hex.slice(2), "hex");
  const numbers: number[] = Array.from(buffer);
  return numbers;
}

export function generateHash(input: string): number[] {
  const hash = createHash("sha256");
  hash.update(input);
  return hex_to_bytes(hash.digest("hex"));
}

/**
 * Generates a random salt of the specified length.
 *
 * @param {number} length - The length of the salt.
 * @returns {Array<(number)>} - The generated salt.
 */
export function generateSalt(length: number): Array<number> {
  const salt: Array<number> = [];
  const bytes = randomBytes(length);

  for (let i = 0; i < length; i++) {
    salt.push(bytes[i]);
  }

  return salt;
}

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
