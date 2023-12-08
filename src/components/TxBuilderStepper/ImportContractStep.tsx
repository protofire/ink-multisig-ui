import { Box, FormControl } from "@mui/material";
import { useEffect } from "react";

import { DropzoneWrapper } from "@/components/common/muiExtended/DropzoneWrapper";
import { InputFileDropzone } from "@/components/InputFileDropzone";
import { isAbiSource } from "@/domain";
import { useIsOnChain } from "@/hooks/validationForms/useIsOnChain";
import { onlyAddress } from "@/utils/inputValidation";

import { TextFieldWithLoading } from "../TextFieldWithLoading/TextFieldWithLoading";
import { useTxBuilderContext } from "./TxBuilderContext";

export function ImportContractStep() {
  const { metadataManager, inputFormManager } = useTxBuilderContext();
  const { metadataFile, onChange, onRemove, metadata } = metadataManager;
  const { register, errors, isLoading, values, setValue } = inputFormManager;
  const { isOnChain } = useIsOnChain();

  useEffect(() => {
    if (!metadata.isValid || !isAbiSource(metadata.source)) return;

    if (values.metadataSource?.source.hash !== metadata.source.source.hash) {
      setValue("metadataSource", metadata.source);
    }
  }, [metadata, setValue, values.metadataSource?.source.hash]);

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      <TextFieldWithLoading
        id="address"
        label="Address contract"
        {...register("address", [onlyAddress, isOnChain])}
        fullWidth
        autoFocus
        error={Boolean(errors["address"])}
        helperText={errors["address"] ? errors["address"] : ""}
        loading={isLoading}
      />
      <FormControl fullWidth={true} sx={{ marginBottom: 3, marginTop: 3 }}>
        <DropzoneWrapper>
          <InputFileDropzone
            label="Drop ABI metadata file or click to select it"
            accept={{ "application/json": [".json", ".contract"] }}
            file={metadataFile}
            onChange={onChange}
            onRemove={onRemove}
            disabled={!values.address || Boolean(errors.address)}
          />
        </DropzoneWrapper>
      </FormControl>
    </Box>
  );
}
