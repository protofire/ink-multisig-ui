import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AbiMessage } from "@polkadot/api-contract/types";
import { useEffect, useMemo, useState } from "react";

import { useContractPromise } from "@/hooks/useContractPromise";
import { useParseMetadataField } from "@/hooks/useParseMetadataField";

import { InputFileDropzone } from "../InputFileDropzone";
import { DropzoneWrapper } from "../shared/DropzoneWrapper";
import { FunctionSignature } from "./FunctionSignature";
import { sortAbiMessages } from "./sortedAbiMessages";
import { useArgValues } from "./useArgValues";

export function FunctionsForm() {
  const [address, setAddress] = useState("");
  const [selectValue, setSelectValue] = useState<string | undefined>();
  const { metadata, metadataFile, onChange, onRemove } =
    useParseMetadataField();
  const contract = useContractPromise(address, metadata);
  const sortedAbiMessages = useMemo(
    () => sortAbiMessages(contract?.abi.messages),
    [contract?.abi.messages]
  );
  const [message, setMessage] = useState<AbiMessage | undefined>();
  const { argValues } = useArgValues(message, contract?.abi.registry);

  console.log("__argValues", argValues);

  useEffect(() => {
    if (!selectValue) return;

    const newMessage = contract?.abi.messages.find(
      (_message) => _message.identifier === selectValue
    );
    newMessage && setMessage(newMessage);
  }, [contract?.abi.messages, selectValue, setMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Card sx={{ padding: "4rem" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="address"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth={true} sx={{ marginBottom: 3, marginTop: 3 }}>
          <DropzoneWrapper>
            <InputFileDropzone
              label="Drop metadata file or click to select it"
              accept={{ "application/json": [".json", ".contract"] }}
              file={metadataFile}
              onChange={onChange}
              onRemove={onRemove}
            />
          </DropzoneWrapper>
        </FormControl>
        {contract && sortedAbiMessages && (
          <FormControl fullWidth>
            <InputLabel id="select-label">Select</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={selectValue ?? sortedAbiMessages[0].identifier}
              label="Select"
              onChange={(e) => {
                setSelectValue(e.target.value);
              }}
            >
              {sortedAbiMessages.map((message) => {
                return (
                  <MenuItem key={message.identifier} value={message.identifier}>
                    <FunctionSignature
                      item={message}
                      registry={contract.abi.registry}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Card>
  );
}
