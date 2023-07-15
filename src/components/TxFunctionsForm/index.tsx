import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
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

import { InputFileDropzone } from "../InputFileDropzone";
import { DropzoneWrapper } from "../shared/DropzoneWrapper";
import { ArgumentsForm } from "./ArgumentForm";
import { FunctionSignatureName } from "./FunctionSignatureName";
import { sortAbiMessages } from "./sortedAbiMessages";
import { TxCall } from "./TxCall";
import { useArgValues } from "./useArgValues";

export function TxFunctionsForm() {
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
  const { argValues, setArgValues } = useArgValues(
    message,
    contract?.abi.registry
  );

  useSetDefaultItem({
    value: selectValue,
    setValue: setSelectValue,
    options: sortedAbiMessages,
    getValue: (message) => message.identifier,
  });

  useEffect(() => {
    if (!selectValue || !sortedAbiMessages) return;

    const newMessage = sortedAbiMessages.find(
      (_message) => _message.identifier === selectValue
    );
    newMessage && setMessage(newMessage);
  }, [sortedAbiMessages, selectValue, setMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  const _onRemove = () => {
    setArgValues({});
    setMessage(undefined);
    onRemove();
    setSelectValue(undefined);
  };

  const changeContractAddress = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (address) _onRemove();
    setAddress(e.target.value);
  };

  return (
    <Box display="flex" justifyContent="space-evenly" gap={2}>
      <Card sx={{ padding: "0.5rem", maxWidth: "30rem" }}>
        <CardHeader title="New Transaction" />
        <Divider />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              id="address"
              label="Address contract"
              value={address}
              onChange={changeContractAddress}
              fullWidth
            />
            <FormControl
              fullWidth={true}
              sx={{ marginBottom: 3, marginTop: 3 }}
            >
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
                  value={selectValue || ""}
                  label="Select Message"
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                  }}
                >
                  {sortedAbiMessages.map((message) => {
                    return (
                      <MenuItem
                        key={message.identifier}
                        value={message.identifier}
                      >
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
        </CardContent>
      </Card>
      <TxCall showTxCard={address ? true : false} />
    </Box>
  );
}