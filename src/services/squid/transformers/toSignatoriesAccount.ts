import { MultisigData } from "@/domain/repositores/IXsignerOwnersRepository";
import { Owner, SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { ArrayOneOrMore } from "@/domain/utilityTsTypes";
import { ChainId } from "@/services/useink/types";
import { generateRandomWalletName } from "@/utils/blockchain";

export function multisigRawToSignatoriesAccount(
  multisigRawData: MultisigData,
  networkId: ChainId
): SignatoriesAccount {
  return {
    address: multisigRawData.addressSS58,
    name: generateRandomWalletName(),
    networkId,
    owners: multisigRawData.owners.map((owner, index) => ({
      address: owner,
      name: `Signer ${index + 1}`,
    })) as ArrayOneOrMore<Owner>,
    threshold: multisigRawData.threshold,
  };
}
