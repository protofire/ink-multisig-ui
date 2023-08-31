import { ChainId } from "useink/dist/chains";

import BaseStepper from "@/components/StepperSignersAccount/BaseStepper";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useFormSignersAccountState } from "@/hooks/xsignersAccount/useFormSignersAccountState";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";

import { useAppNotificationContext } from "../AppToastNotification/AppNotificationsContext";
import { useManagerActiveStep } from "../StepperSignersAccount/useManagerActiveStep";
import { LOAD_STEPS } from "./constants";

export function LoadNewAccount() {
  const data = useFormSignersAccountState();
  const managerStep = useManagerActiveStep();
  const { network } = usePolkadotContext();
  const { setXsigner } = useSetXsignerSelected();
  const { addNotification } = useAppNotificationContext();

  const handleImportedAccount = () => {
    const account: SignatoriesAccount = {
      name: data.walletName,
      address: data.address as string,
      networkId: network as ChainId,
      owners: data.owners,
      threshold: data.threshold,
    };
    setXsigner(account);
    addNotification({
      message: "Your Xsigner account has been successfully imported",
      type: "success",
    });
  };

  return (
    <>
      <BaseStepper
        isExecuting={false}
        steps={LOAD_STEPS}
        data={data}
        onCompleteCreation={handleImportedAccount}
        managerStep={managerStep}
      />
    </>
  );
}

export default LoadNewAccount;
