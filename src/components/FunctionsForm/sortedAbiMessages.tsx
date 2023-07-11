import { AbiMessage } from "@polkadot/api-contract/types";

export function sortAbiMessages(
  abiMessages: AbiMessage[] | undefined
): AbiMessage[] {
  if (!abiMessages?.length) return [];

  const sortedAbiMessages = [...abiMessages];

  sortedAbiMessages.sort((a, b) => {
    if (a.isMutating && !b.isMutating) {
      return -1;
    }
    if (!a.isMutating && b.isMutating) {
      return 1;
    }
    if (a.method < b.method) {
      return -1;
    }
    if (a.method > b.method) {
      return 1;
    }
    return 0;
  });

  return sortedAbiMessages;
}
