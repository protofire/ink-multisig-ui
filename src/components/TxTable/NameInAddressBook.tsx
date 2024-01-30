import { useEffect, useState } from "react";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useNameAddressBookContext } from "@/context/NameInAddressBookContext";
import { truncateAddress } from "@/utils/formatString";

interface Props {
  recipient: string | undefined;
}
export function NameInAddressBook({ recipient }: Props) {
  const [nameInAddressBook, setNameInAddressBook] = useState<
    string | undefined | null
  >();
  const { isLoading, nameConnectedOrAddressBookOrSigners } =
    useNameAddressBookContext();

  useEffect(() => {
    const _name = recipient
      ? nameConnectedOrAddressBookOrSigners(recipient)
      : null;

    setNameInAddressBook(_name);
  }, [recipient, nameConnectedOrAddressBookOrSigners]);

  if (isLoading || nameInAddressBook === undefined) {
    return <LoadingSkeleton count={1} />;
  }

  return nameInAddressBook
    ? `${nameInAddressBook} (${truncateAddress(recipient, 3)})`
    : truncateAddress(recipient, 9);
}
