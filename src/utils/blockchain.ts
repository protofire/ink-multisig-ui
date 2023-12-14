import { ContractPromise } from "@polkadot/api-contract";
import { AbiMessage } from "@polkadot/api-contract/types";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import * as ss58 from "@subsquid/ss58";
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
  "Island",
];

let counter = 0;

export const generateRandomWalletName = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const uniqueNumber = counter++;

  return `${adjective}-${noun}-${uniqueNumber}`;
};

export const splitTokenAmount = (balance?: string) => {
  if (!balance || balance === "0") {
    return undefined;
  }

  const match = balance.match(/(\d+(?:\.\d+)?)\s+([A-Za-z]+)/);

  if (match) {
    const [_, amount, tokenSymbol] = match;
    return { amount, tokenSymbol };
  }

  return undefined;
};

const networkIdToPrefix: Record<string, number> = {
  "shibuya-testnet": 5,
  "rococo-contracts-testnet": 42,
};

export const formatAddressForNetwork = (address: string, networkId: string) => {
  const rawAddress = ss58.decode(address).bytes;

  const prefix =
    networkIdToPrefix[networkId] !== undefined
      ? networkIdToPrefix[networkId]
      : 42;

  return ss58.codec(prefix).encode(rawAddress);
};

export const transformArgsToBytes = (
  contractPromise: ContractPromise,
  methodName: string,
  args: unknown[]
): number[] => {
  const messageInfo = contractPromise.abi.messages.find(
    (m) => m.method === methodName
  );

  if (!messageInfo) {
    throw new Error("Message not found");
  }

  if (args.length !== messageInfo.args.length) {
    throw new Error("Invalid number of arguments");
  }

  const numbers: number[] = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const argInfo = messageInfo.args[i];

    const convertedArg = contractPromise.api
      .createType(argInfo.type.type, arg)
      .toU8a();
    // Log the index and the convertedArg
    //console.log("arg", i, convertedArg);

    // Append the convertedArg directly to the numbers array
    for (const byte of convertedArg) {
      numbers.push(byte);
    }
  }

  return numbers;
};

export const getMessageInfo = (
  contractPromise: ContractPromise,
  methodName: string
): AbiMessage | null => {
  return (
    contractPromise.abi.messages.find((m) => m.method === methodName) || null
  );
};
