import { useEffect, useState } from "react";

import { useNameAddressBookContext } from "@/context/NameInAddressBookContext";
import { truncateAddress } from "@/utils/formatString";

import { LoadingSkeleton } from "../common/LoadingSkeleton";

interface Props {
  recipient: string | undefined;
}
export function NameInAddressBook({ recipient }: Props) {
  const [nameInAddressBook, setNameInAddressBook] = useState<
    string | undefined | null
  >();
  const { nameConnectedOrAddressBookOrSigners } = useNameAddressBookContext();

  useEffect(() => {
    const _name = recipient
      ? nameConnectedOrAddressBookOrSigners(recipient)
      : null;

    setNameInAddressBook(_name);
  }, [recipient, nameConnectedOrAddressBookOrSigners]);

  if (nameInAddressBook === undefined) {
    return <LoadingSkeleton />;
  }

  return nameInAddressBook
    ? `${nameInAddressBook} (${truncateAddress(recipient, 3)})`
    : truncateAddress(recipient, 9);
}
