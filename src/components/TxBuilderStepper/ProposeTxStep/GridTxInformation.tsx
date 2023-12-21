import { Box, BoxProps, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { MonoTypography } from "@/components/MonoTypography";

export const BoxGridStyled = styled(Box)<BoxProps>(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(3, 0.5fr)",
  gap: "1rem",
  marginTop: "1rem",
  border: "1px solid",
  borderColor: theme.palette.grey[600],
  padding: "1rem",
  borderRadius: "1rem",
}));

export const BoxRow = styled(Box)<BoxProps>(() => ({
  display: "inherit",
}));

interface Props {
  contractAddress: string;
  args: string;
}

export function GridTxInformation({ contractAddress, args }: Props) {
  return (
    <BoxGridStyled>
      <BoxRow>
        <Typography variant="caption" fontWeight="500">
          To Address
        </Typography>
        <MonoTypography variant="body1">{contractAddress}</MonoTypography>
      </BoxRow>
      <BoxRow>
        <Typography variant="caption" fontWeight="500">
          Arguments
        </Typography>
        <MonoTypography variant="body1">{args}</MonoTypography>
      </BoxRow>
    </BoxGridStyled>
  );
}
