import { Box, BoxProps, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const BoxWrapper = styled(Box)<BoxProps>(() => ({}));

interface Props {
  freeBalance: string | undefined;
  reservedBalance: string | undefined;
}

export function XsignerBalanceText({ freeBalance, reservedBalance }: Props) {
  return (
    <BoxWrapper>
      <Typography>{freeBalance}</Typography>
      <Typography>{reservedBalance}</Typography>
    </BoxWrapper>
  );
}
