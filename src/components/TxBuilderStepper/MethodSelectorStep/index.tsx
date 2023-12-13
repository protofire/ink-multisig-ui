import styled from "@emotion/styled";
import {
  Box,
  BoxProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

import { FunctionSignatureName } from "@/components/ArgumentForm/FunctionSignatureName";
import { useArgValues } from "@/components/ArgumentForm/useArgValues";
import CopyButton from "@/components/common/CopyButton";
import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import { MonoTypography } from "@/components/MonoTypography";
import { AbiSource } from "@/domain";
import { useContractPromiseFromSource } from "@/hooks/useContractPromise";
import { transformSelectChangeEvent } from "@/hooks/useForm/transformSelectChangeEvent";
import { useNetworkApi } from "@/hooks/useNetworkApi";
import { groupAndSortAbiMessages } from "@/services/substrate/utils";
import { truncateAddress } from "@/utils/formatString";
import { notEmpty } from "@/utils/inputValidation";

import { NextBackButtonStepper } from "../NextBackButtonStepper";
import { useTxBuilderContext } from "../TxBuilderContext";
import { WriteMethodsForm } from "./WriteMethodsForm";

export const BoxRow = styled(Box)<BoxProps>(() => ({
  display: "inherit",
}));

export function MethodSelectorStep() {
  const { inputFormManager, managerStep } = useTxBuilderContext();
  const {
    address: contractAddress,
    metadataSource,
    selectedAbiIdentifier,
  } = inputFormManager.values;
  const {
    activeStep: { creation: activeStep },
    downCreationStep: handleBack,
    upCreationStep: handleNext,
    stepsLength,
  } = managerStep;
  const { apiPromise } = useNetworkApi();
  const contractPromise = useContractPromiseFromSource(
    contractAddress,
    metadataSource as AbiSource, // was previously validated
    apiPromise
  );
  const sortedAbiMessages = useMemo(
    () =>
      contractPromise &&
      groupAndSortAbiMessages(contractPromise.abi.messages).mutating,
    [contractPromise]
  );
  const substrateRegistry = contractPromise?.abi.registry;
  const abiMessageSelected = useMemo(
    () =>
      sortedAbiMessages?.find(
        (abiMessage) => abiMessage.identifier === selectedAbiIdentifier
      ),
    [selectedAbiIdentifier, sortedAbiMessages]
  );
  const { register, errors, isValid, touched, setValue } = inputFormManager;
  const identifierAbiMessageInput = register("selectedAbiIdentifier", [
    notEmpty,
  ]);
  const argValuesManager = useArgValues(abiMessageSelected, substrateRegistry);

  if (!contractPromise) {
    return (
      <FallbackSpinner
        sx={{
          justifyContent: "start",
          height: "auto",
        }}
        text="Getting the connected network API..."
      />
    );
  }

  if (!sortedAbiMessages) {
    return (
      <FallbackSpinner
        sx={{
          justifyContent: "start",
        }}
        text="Getting the metadata interface (ABI) to interact with the Smart Contract"
      />
    );
  }

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      <BoxRow
        flexDirection="row"
        display={"flex"}
        gap={1}
        alignItems={"center"}
        paddingBottom={3}
      >
        <Typography variant="caption" fontWeight="500">
          Contract Address:
        </Typography>
        <BoxRow>
          <MonoTypography variant="body1">
            {truncateAddress(contractAddress)}
          </MonoTypography>
          <CopyButton text={contractAddress} />
        </BoxRow>
      </BoxRow>
      {contractAddress && sortedAbiMessages && substrateRegistry && (
        <FormControl fullWidth>
          <InputLabel id="select-label">Select Message</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={identifierAbiMessageInput.value || ""}
            label="Select Message"
            autoFocus
            onChange={transformSelectChangeEvent(
              identifierAbiMessageInput.onChange,
              "selectedAbiIdentifier"
            )}
            error={Boolean(errors["selectedAbiIdentifier"])}
          >
            {sortedAbiMessages.map((message) => {
              return (
                <MenuItem key={message.identifier} value={message.identifier}>
                  <FunctionSignatureName
                    abiMessage={message}
                    registry={substrateRegistry}
                  />
                </MenuItem>
              );
            })}
          </Select>

          {abiMessageSelected && (
            <WriteMethodsForm
              abiMessage={abiMessageSelected}
              substrateRegistry={substrateRegistry}
              contractPromise={contractPromise.contractPromise}
              argValuesManager={argValuesManager}
            />
          )}
        </FormControl>
      )}
      <Box p={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={() => {
            setValue("dataArgsU8a", argValuesManager.inputDataU8a);
            handleNext();
          }}
          hiddenBack={activeStep === 0 ? true : false}
          nextButtonProps={{
            disabled: !isValid || !touched.selectedAbiIdentifier,
          }}
        />
      </Box>
    </Box>
  );
}
