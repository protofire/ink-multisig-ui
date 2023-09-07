import { ChainId } from "useink/dist/chains";

import { AddressBookContainer } from "@/components/AddressBook";
import { usePolkadotContext } from "@/context/usePolkadotContext";

export default function AddressBookPage() {
  const { network } = usePolkadotContext();
  return <AddressBookContainer network={network as ChainId} />;
}
