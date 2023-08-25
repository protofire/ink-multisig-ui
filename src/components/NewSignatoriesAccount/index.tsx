import { useState } from "react";

import ErrorMessage from "@/components/common/ErrorMessage";
import {
  CreateNewAccount,
  SaveProps,
} from "@/components/StepperSignersAccount";
import {
  useAddSignersAccount,
  useNewSignersAccount,
} from "@/hooks/xsignersAccount";
import { ChainId } from "@/services/useink/types";

interface Props {
  networkId: ChainId;
}

export function NewSignatoriesAccount({ networkId }: Props) {
  const [isExecuting, setIsExecuting] = useState(false);
  const { save } = useAddSignersAccount();
  const { signAndSend, txStatus, error } = useNewSignersAccount(save);

  const handleSave = (account: SaveProps) => signAndSend(account);

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <CreateNewAccount
        isExecuting={isExecuting}
        save={handleSave}
        onComplete={() => setIsExecuting(true)}
        networkId={networkId}
        txStatus={txStatus}
      />
    </>
  );
}
