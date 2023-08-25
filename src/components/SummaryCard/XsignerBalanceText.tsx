import { Box, BoxProps, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const BoxWrapper = styled(Box)<BoxProps>(() => ({
  padding: "1rem",
}));

interface Props {
  freeBalance: string | undefined;
  reservedBalance?: string | undefined;
  totalBalance?: string | undefined;
}

export function XsignerBalanceText({
  freeBalance,
  reservedBalance,
  totalBalance,
}: Props) {
  return (
    <BoxWrapper>
      <Typography>Transferrable: {freeBalance}</Typography>
      <Typography>Reserved: {reservedBalance}</Typography>
      <Typography>Total Balance: {totalBalance}</Typography>
    </BoxWrapper>
  );
}
