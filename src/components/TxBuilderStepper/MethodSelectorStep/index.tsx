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
import { useMemo, useState } from "react";

import { FunctionSignatureName } from "@/components/ArgumentForm/FunctionSignatureName";
import CopyButton from "@/components/common/CopyButton";
import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import { AbiSource } from "@/domain";
import { useContractPromiseFromSource } from "@/hooks/useContractPromise";
import { useNetworkApi } from "@/hooks/useNetworkApi";
import { groupAndSortAbiMessages } from "@/services/substrate/utils";
import { truncateAddress } from "@/utils/formatString";

import { MonoTypography } from "../../MonoTypography";
import { useTxBuilderContext } from "../TxBuilderContext";
import { WriteMethodsForm } from "./WriteMethodsForm";

export const BoxRow = styled(Box)<BoxProps>(() => ({
  display: "inherit",
}));

export function MethodSelectorStep() {
  const { inputFormManager } = useTxBuilderContext();
  const { address: contractAddress, metadataSource } = inputFormManager.values;
  const [selectedMsgName, setSelectedMsgName] = useState<string | undefined>();
  const { apiPromise, network } = useNetworkApi();
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
        (abiMessage) => abiMessage.identifier === selectedMsgName
      ),
    [selectedMsgName, sortedAbiMessages]
  );

  if (!contractPromise) {
    return (
      <FallbackSpinner
        sx={{
          mt: "3rem",
          justifyContent: "start",
        }}
        text="Getting the connected network API..."
      />
    );
  }

  if (!sortedAbiMessages) {
    return (
      <FallbackSpinner
        sx={{
          mt: "3rem",
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
            value={selectedMsgName || ""}
            label="Select Message"
            autoFocus
            onChange={(e) => {
              setSelectedMsgName(e.target.value);
            }}
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
            />
          )}
        </FormControl>
      )}
    </Box>
  );
}
