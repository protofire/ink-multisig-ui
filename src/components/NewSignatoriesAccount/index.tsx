import { useEffect, useState } from "react";
import { useContract, useEvents, useEventSubscription, useTx } from "useink";
import { MultisigFactorySdk } from "xsigners-sdk-test";

import ErrorMessage from "@/components/common/ErrorMessage";
import {
  CreateNewAccount,
  SaveProps,
} from "@/components/StepperSignersAccount";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useNewSignersAccount } from "@/hooks/xsignersAccount";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
import { ChainId } from "@/services/useink/types";

interface Props {
  networkId: ChainId;
}

export function NewSignatoriesAccount({ networkId }: Props) {
  const { save, isLoading, error } = useNewSignersAccount();
  const [isExecuting, setIsExecuting] = useState(false);
  const { setXsigner } = useSetXsignerSelected();

  const metadata = MultisigFactorySdk.contractMetadata("shibuya-testnet");
  const multisigFactoryContract = useContract(
    metadata?.addressChain,
    JSON.parse(metadata?.ContractAbi),
    "shibuya-testnet"
  );
  const newMultisigTx = useTx(multisigFactoryContract, "newMultisig");
  useEventSubscription(multisigFactoryContract);
  const { events: multisigFactoryEvents } = useEvents(
    multisigFactoryContract?.contract.address,
    ["NewMultisig"]
  );

  useEffect(() => {
    if (!multisigFactoryEvents || multisigFactoryEvents.length === 0) return;
    console.log("multisigFactoryEvents", multisigFactoryEvents);
    // setActiveStep((prevActiveStep) => ({
    //   ...prevActiveStep,
    //   execution: prevActiveStep.execution + 1,
    // }));
  }, [multisigFactoryEvents]);

  const handleSave = async (data: SaveProps) => {
    const address = "5CQnnhbG8hSwXkzFXm6C5y8okSX6xMa1kjs2UaCHXc5jUE42";
    const parsedData: SignatoriesAccount = {
      ...data,
      address,
    };
    // save(parsedData, {
    //   onSuccess: (_acc) => {
    //     setXsigner(_acc);
    //   },
    // });

    // const parsedData: SaveProps = {
    //   owners: data.owners,
    //   threshold: data.threshold,
    //   name: data.walletName,
    //   networkId,
    // };

    // const date = new Date();
    // const salt = generateHash(date.toString());
    // const owners = parsedData.owners.map((o) => o.address);

    // // Here we create the Tx and then send it to the wallet to be signed.
    // // We DO NOT wait for the wallet to sign it, we just send it.
    // newMultisigTx.signAndSend([parsedData.threshold, owners, salt]);
    // save?.(parsedData);

    console.log("__data", data);
  };

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
