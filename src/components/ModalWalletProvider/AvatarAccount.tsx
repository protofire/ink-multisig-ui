import { Identicon } from "@/components/Identicon";

export function AvatarAccount({ address }: { address: string }) {
  return <Identicon theme="substrate" size={40} value={address} />;
}
