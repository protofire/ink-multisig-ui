import { useState } from "react";

import ErrorMessage from "@/components/common/ErrorMessage";
import {
  CreateNewAccount,
  SaveProps,
} from "@/components/StepperSignersAccount";
import { useNewSignersAccount } from "@/hooks/xsignersAccount";
import { ChainId } from "@/services/useink/types";
import { generateHash } from "@/utils/blockchain";

interface Props {
  networkId: ChainId;
}

export function NewSignatoriesAccount({ networkId }: Props) {
  const { signAndSend, isLoading, error } = useNewSignersAccount();
  const [isExecuting, setIsExecuting] = useState(false);

  const handleSave = async (data: SaveProps) => {
    const date = new Date();
    const salt = generateHash(date.toString());
    const owners = data.owners.map((o) => o.address);

    // // Here we create the Tx and then send it to the wallet to be signed.
    // // We DO NOT wait for the wallet to sign it, we just send it.
    console.log("__signAndSending", data, signAndSend);
    // tx.signAndSend([data.threshold, owners, salt], undefined, console.log);
    signAndSend(data.threshold, owners, salt);
  };

  // <Box>
  //   <h2>Status: {newMultisigTx?.status}</h2>
  // </Box>

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <CreateNewAccount
        isExecuting={isExecuting}
        save={handleSave}
        onComplete={() => setIsExecuting(true)}
        networkId={networkId}
      />
    </>
  );
}
