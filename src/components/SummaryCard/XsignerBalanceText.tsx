import { Box, BoxProps, styled, Typography } from "@mui/material";

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
