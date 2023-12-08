import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AbiMessage } from "@polkadot/api-contract/types";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { useContractPromise } from "@/hooks/useContractPromise";
import { useParseMetadataField } from "@/hooks/useParseMetadataField";
import useSetDefaultItem from "@/hooks/useSetDefaultFirstItem";

import { DropzoneWrapper } from "../common/muiExtended/DropzoneWrapper";
import { InputFileDropzone } from "../InputFileDropzone";
import { ArgumentsForm } from "./ArgumentForm";
import { FunctionSignatureName } from "./FunctionSignatureName";
import { sortAbiMessages } from "./sortedAbiMessages";
import { TxExecution } from "./TxExecution";
import { useArgValues } from "./useArgValues";

export function TxFunctionsForm() {
  const [address, setAddress] = useState("");
  const [selectedMsgName, setSelectedMsgName] = useState<string | undefined>();
  const { metadata, metadataFile, onChange, onRemove } =
    useParseMetadataField();
  const contract = useContractPromise(address, metadata);
  const sortedAbiMessages = useMemo(
    () => sortAbiMessages(contract?.abi.messages),
    [contract?.abi.messages]
  );
  const [message, setMessage] = useState<AbiMessage | undefined>();
  const { argValues, setArgValues, inputData } = useArgValues(
    message,
    contract?.abi.registry
  );
  useSetDefaultItem({
    value: selectedMsgName,
    setValue: setSelectedMsgName,
    options: sortedAbiMessages,
    getValue: (message) => message.identifier,
  });

  useEffect(() => {
    if (!selectedMsgName || !sortedAbiMessages) return;

    const newMessage = sortedAbiMessages.find(
      (_message) => _message.identifier === selectedMsgName
    );
    newMessage && setMessage(newMessage);
  }, [sortedAbiMessages, selectedMsgName, setMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const _onRemove = () => {
    setArgValues({});
    setMessage(undefined);
    onRemove();
    setSelectedMsgName(undefined);
  };

  const changeContractAddress = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (address) _onRemove();
    setAddress(e.target.value);
  };

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      <form onSubmit={handleSubmit}>
        <TextField
          id="address"
          label="Address contract"
          value={address}
          onChange={changeContractAddress}
          fullWidth
          autoFocus
        />
        <FormControl fullWidth={true} sx={{ marginBottom: 3, marginTop: 3 }}>
          <DropzoneWrapper>
            <InputFileDropzone
              label="Drop ABI metadata file or click to select it"
              accept={{ "application/json": [".json", ".contract"] }}
              file={metadataFile}
              onChange={onChange}
              onRemove={_onRemove}
            />
          </DropzoneWrapper>
        </FormControl>
        {contract && sortedAbiMessages && (
          <FormControl fullWidth>
            <InputLabel id="select-label">Select Message</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={selectedMsgName || ""}
              label="Select Message"
              onChange={(e) => {
                setSelectedMsgName(e.target.value);
              }}
            >
              {sortedAbiMessages.map((message) => {
                return (
                  <MenuItem key={message.identifier} value={message.identifier}>
                    <FunctionSignatureName
                      abiMessage={message}
                      registry={contract.abi.registry}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        {argValues && contract?.abi.registry && (
          <ArgumentsForm
            argValues={argValues}
            args={message?.args ?? []}
            registry={contract?.abi.registry}
            setArgValues={setArgValues}
          />
        )}
      </form>
      <TxExecution
        contractPromise={contract?.contractPromise}
        message={message}
        showTxCard={address && message && contract ? true : false}
        params={inputData}
      />
    </Box>
  );
}
