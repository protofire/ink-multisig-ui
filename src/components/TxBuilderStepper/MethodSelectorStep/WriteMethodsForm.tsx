import { Box, FormHelperText, Stack, Typography } from "@mui/material";

import { ArgumentsForm } from "@/components/ArgumentForm/ArgumentForm";
import { UseArgValuesReturn } from "@/components/ArgumentForm/useArgValues";
import { useDryRunExecution } from "@/hooks/useDryRunExecution";
import {
  AbiMessage,
  ContractPromise,
  Registry,
} from "@/services/substrate/types";

import { useTxBuilderContext } from "../TxBuilderContext";
import { DryRunMessage } from "./DryRunMessage";
import { MethodDocumentation } from "./MethodDocumentation";

interface Props {
  abiMessage: AbiMessage;
  substrateRegistry: Registry;
  contractPromise: ContractPromise;
  argValuesManager: UseArgValuesReturn;
}

export function WriteMethodsForm({
  abiMessage,
  substrateRegistry,
  contractPromise,
  argValuesManager,
}: Props) {
  const { inputData, argValues, setArgValues } = argValuesManager;
  const { inputFormManager } = useTxBuilderContext();
  const { setValue } = inputFormManager;
  const abiParams = abiMessage.args ?? [];

  const {
    outcome: outcomeDryRun = "",
    error: errorDryrun,
    isRunning: isDryRunning,
  } = useDryRunExecution({
    contractPromise,
    message: abiMessage,
    params: inputData,
    substrateRegistry,
    autoRun: true,
  });

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        paddingTop={2}
      >
        <Box minWidth="50%">
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {abiParams.length > 0 && (
                <Typography variant="caption" fontWeight="500">
                  Message to send:
                </Typography>
              )}
              <DryRunMessage
                error={errorDryrun}
                outcome={outcomeDryRun}
                isRunning={isDryRunning}
              />
            </Box>
            <ArgumentsForm
              argValues={argValues}
              args={abiParams}
              registry={substrateRegistry}
              setArgValues={setArgValues}
            />
          </>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {errorDryrun && (
              <FormHelperText error id={`error-${abiMessage.method}`}>
                {errorDryrun}
              </FormHelperText>
            )}
          </Box>
        </Box>
        <Box sx={{ maxWidth: "45%", minWidth: "40%" }}>
          <MethodDocumentation abiMessage={abiMessage} />
        </Box>
      </Stack>
    </>
  );
}
