import styled from "@emotion/styled";
import { Box, BoxProps, Typography } from "@mui/material";

import { truncateAddress } from "@/utils/formatString";

import CopyButton from "../common/CopyButton";
import { MonoTypography } from "../MonoTypography";
import { useTxBuilderContext } from "./TxBuilderContext";

export const BoxRow = styled(Box)<BoxProps>(() => ({
  display: "inherit",
}));

export function MethodSelectorStep() {
  const { inputFormManager } = useTxBuilderContext();
  const contractAddress = inputFormManager.values.address;

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      <BoxRow flexDirection="column">
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
    </Box>
  );
}
