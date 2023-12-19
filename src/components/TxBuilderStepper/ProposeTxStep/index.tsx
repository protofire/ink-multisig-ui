import { Box } from "@mui/material";

import ErrorMessage from "@/components/common/ErrorMessage";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

import { NextBackButtonStepper } from "../NextBackButtonStepper";
import { useTxBuilderContext } from "../TxBuilderContext";
import { DryRunMultisigWidget } from "./DryRunWidget";

export function ProposeTxStep() {
  const { inputFormManager, managerStep } = useTxBuilderContext();
  const { selectedAbiMessage, transferTxStruct } = inputFormManager.values;
  const {
    activeStep: { creation: activeStep },
    downCreationStep: handleBack,
    upCreationStep: handleNext,
    stepsLength,
  } = managerStep;
  const { xSignerSelected } = useGetXsignerSelected();
  const { multisigContractPromise } = useMultisigContractPromise(
    xSignerSelected?.address
  );

  // const dryRun = useGetDryRun(multisigContractPromise?.contract, "proposeTx");

  // const {
  //   outcome: outcomeDryRun = "",
  //   error: errorDryrun,
  //   isRunning: isDryRunning,
  // } = useDryRunExecution({
  //   contractPromise: multisigContractPromise?.contract,
  //   message: selectedAbiMessage,
  //   params,
  //   substrateRegistry: multisigContractPromise?.contract.registry,
  //   autoRun: true,
  // });

  if (!transferTxStruct)
    return (
      <ErrorMessage
        message={"Message has not been set successfully, please return."}
      />
    );

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      {multisigContractPromise && selectedAbiMessage && (
        <DryRunMultisigWidget
          contractMultisigPromise={multisigContractPromise.contract}
          transferTxStruct={transferTxStruct}
        />
      )}
      <Box p={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={handleNext}
          hiddenBack={activeStep === 0 ? true : false}
          nextButtonProps={{
            disabled: true,
          }}
        />
      </Box>
    </Box>
  );
}
