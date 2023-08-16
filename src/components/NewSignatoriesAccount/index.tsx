import { useState } from "react";

import ErrorMessage from "@/components/common/ErrorMessage";
import StepperNewSignersAccount, {
  SaveProps,
} from "@/components/StepperNewSignersAccount";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useAddSignersAccount } from "@/hooks/signatoriesAccount";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
import { ChainId } from "@/services/useink/types";

interface Props {
  networkId: ChainId;
}

export function NewSignatoriesAccount({ networkId }: Props) {
  const { save, isLoading, error } = useAddSignersAccount();
  const [isExecuting, setIsExecuting] = useState(false);
  const { setXsigner } = useSetXsignerSelected();

  const handleSave = (data: SaveProps) => {
    const address = "5CQnnhbG8hSwXkzFXm6C5y8okSX6xMa1kjs2UaCHXc5jUE42";
    const parsedData: SignatoriesAccount = {
      ...data,
      address,
    };
    save(parsedData, {
      onSuccess: (_acc) => {
        setXsigner(_acc);
      },
    });
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <StepperNewSignersAccount
        isExecuting={isExecuting}
        save={handleSave}
        onComplete={() => setIsExecuting(true)}
        networkId={networkId}
      />
    </>
  );
}
