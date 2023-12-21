import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

import CopyButton from "@/components/common/CopyButton";
import ErrorMessage from "@/components/common/ErrorMessage";
import { ExplorerLink } from "@/components/ExplorerLink";
import { TextFieldWithLoadingProps } from "@/components/TextFieldWithLoading/TextFieldWithLoading";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useRecentlyClicked } from "@/hooks/useRecentlyClicked";
import { useTxDispatchNotification } from "@/hooks/useTxDispatchNotfication";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import {
  replacerArgs,
  stringify,
} from "@/services/substrate/utils/contractExecResult";
import { shouldDisable } from "@/services/useink/utils";
import { getMessageInfo } from "@/utils/blockchain";

import { NextBackButtonStepper } from "../NextBackButtonStepper";
import { useTxBuilderContext } from "../TxBuilderContext";
import { DryRunMultisigWidget } from "./DryRunWidget";
import { GridTxInformation } from "./GridTxInformation";
import { MinimalTextField } from "./styled";
import { TxStatusMessage } from "./TxStatusMessage";
import { useContractTx } from "./useContractTx";

const TextFieldMemoized: React.FC<TextFieldWithLoadingProps> = React.memo(
  function Memoized(props) {
    return <MinimalTextField {...props} />;
  }
);

export function ProposeTxStep() {
  const { inputFormManager, managerStep } = useTxBuilderContext();
  const { transferTxStruct, selectedAbiIdentifier } = inputFormManager.values;
  const {
    activeStep: { creation: activeStep },
    downCreationStep: handleBack,
    stepsLength,
  } = managerStep;
  const { xSignerSelected } = useGetXsignerSelected();
  const { multisigContractPromise } = useMultisigContractPromise(
    xSignerSelected?.address
  );
  const [dryRunSuccessfully, setDryRunSuccessfully] = useState(false);
  const proposeTxAbiMessage =
    multisigContractPromise &&
    getMessageInfo(multisigContractPromise?.contract, "proposeTx");
  const {
    signAndSend,
    tx,
    outcome: outcomeTx,
  } = useContractTx({
    contractPromise: multisigContractPromise?.contract,
    abiMessage: proposeTxAbiMessage,
  });
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(2000);
  const isLoading = recentlyClicked || shouldDisable(tx);
  useTxDispatchNotification({ tx });

  const _signAndSend = (args?: unknown[]) => {
    console.log("__createTxMetadata");
    // signAndSend(args);
  };

  if (!transferTxStruct)
    return (
      <ErrorMessage
        message={"Message has not been set successfully, please return."}
      />
    );

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      <GridTxInformation
        contractAddress={inputFormManager.values.address}
        args={stringify(
          inputFormManager.values.dataArgs?.map(
            (value, index) => replacerArgs(index.toString(), value),
            0
          )
        )}
        methodName={selectedAbiIdentifier}
      />
      {multisigContractPromise &&
        proposeTxAbiMessage &&
        !outcomeTx &&
        !shouldDisable(tx) && (
          <DryRunMultisigWidget
            contractMultisigPromise={multisigContractPromise.contract}
            transferTxStruct={transferTxStruct}
            proposeTxAbiMessage={proposeTxAbiMessage}
            setDryRunResult={setDryRunSuccessfully}
          />
        )}
      {shouldDisable(tx) && <TxStatusMessage txStatus={tx.status} />}
      {outcomeTx && dryRunSuccessfully && (
        <>
          <Typography variant="body1">
            Transaction executed identifier:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextFieldMemoized
              disabled={Boolean(isLoading)}
              placeholder="Result not yet available."
              value={outcomeTx}
              fullWidth
              multiline
            />
            <CopyButton text={outcomeTx} />
            <ExplorerLink
              blockchain={multisigContractPromise?.chainId}
              txHash={outcomeTx}
            />
          </Box>
        </>
      )}

      <Box p={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={() => _signAndSend([Object.values(transferTxStruct)])}
          hiddenBack={activeStep === 0 ? true : false}
          nextButtonProps={{
            ref: refButton,
            disabled: !dryRunSuccessfully || isLoading,
            isLoading,
          }}
          nextLabel="Sign"
        />
      </Box>
    </Box>
  );
}
