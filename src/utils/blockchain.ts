import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import BN from "bn.js";
import { randomBytes } from "crypto";

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

/**
 * Generates a random salt of the specified length.
 *
 * @param {number} length - The length of the salt.
 * @returns {Array<(number | string | BN)>} - The generated salt.
 */
export function generateSalt(length: number): Array<number | string | BN> {
  const salt: Array<number | string | BN> = [];
  for (let i = 0; i < length; i++) {
    // Generates a random number between 0 and 255
    const randomNum = randomBytes(1)[0];
    salt.push(new BN(randomNum));
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
