import Identicon from "@polkadot/react-identicon";

export function AvatarAccount({ address }: { address: string }) {
  return <Identicon theme="ethereum" size={40} value={address} />;
}
