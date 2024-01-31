import { Box, Typography } from "@mui/material";
import router from "next/router";
import React, { useCallback, useMemo, useRef, useState } from "react";

import CopyButton from "@/components/common/CopyButton";
import ErrorMessage from "@/components/common/ErrorMessage";
import { ExplorerLink } from "@/components/ExplorerLink";
import { TextFieldWithLoadingProps } from "@/components/TextFieldWithLoading/TextFieldWithLoading";
import { ROUTES } from "@/config/routes";
import { useRecentlyClicked } from "@/hooks/common/useRecentlyClicked";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { sringArgsToContractParam } from "@/hooks/externalTxData/stringArgsToContractParam";
import { useCreateExternalTxData } from "@/hooks/externalTxData/useCreateExternalTxData";
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
  const [dryRunSuccessfully, setDryRunSuccessfully] = useState(false);
  const lastTxRegistered = useRef<string | undefined>();
  const { createTxData } = useCreateExternalTxData();
  const { xSignerSelected } = useGetXsignerSelected();
  const { multisigContractPromise } = useMultisigContractPromise(
    xSignerSelected?.address
  );
  const { transferTxStruct, selectedAbiIdentifier, selectedAbiMessage } =
    inputFormManager.values;
  const {
    activeStep: { creation: activeStep },
    downCreationStep: handleBack,
    stepsLength,
  } = managerStep;
  const proposeTxAbiMessage =
    multisigContractPromise &&
    getMessageInfo(multisigContractPromise?.contract, "proposeTx");
  const formattedParams = useMemo(
    () =>
      stringify(
        inputFormManager.values.dataArgs?.map(
          (value, index) => replacerArgs(index.toString(), value),
          0
        )
      ),
    [inputFormManager.values.dataArgs]
  );
  const _createTxData = useCallback(
    (txHash: string) => {
      if (!selectedAbiMessage || lastTxRegistered.current === txHash) return;

      createTxData({
        txHash,
        args: sringArgsToContractParam(
          selectedAbiMessage.args,
          formattedParams
        ),
        methodName: selectedAbiMessage.identifier,
      });
      lastTxRegistered.current = txHash;
    },
    [createTxData, formattedParams, selectedAbiMessage]
  );
  const {
    signAndSend,
    tx,
    outcome: outcomeTx,
  } = useContractTx({
    contractPromise: multisigContractPromise?.contract,
    abiMessage: proposeTxAbiMessage,
    onTxHash: _createTxData,
  });
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(2000);
  const isLoading = recentlyClicked || shouldDisable(tx);

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
        args={formattedParams}
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
          handleNext={() => {
            outcomeTx
              ? router.replace(ROUTES.Transactions)
              : signAndSend([Object.values(transferTxStruct)]);
          }}
          hiddenBack={activeStep === 0 ? true : false}
          nextButtonProps={{
            ref: refButton,
            disabled: !dryRunSuccessfully || isLoading,
            isLoading,
          }}
          nextLabel={outcomeTx ? "Go to Transactions" : "Sign"}
        />
      </Box>
    </Box>
  );
}
