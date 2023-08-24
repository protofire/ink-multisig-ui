import { Identicon } from "@/components/Identicon";

export function AvatarAccount({ address }: { address: string }) {
  return <Identicon theme="beachball" size={40} value={address} />;
}
