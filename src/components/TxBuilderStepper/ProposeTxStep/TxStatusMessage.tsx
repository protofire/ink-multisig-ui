import { Typography } from "@mui/material";

interface Props {
  txStatus?: string;
}

export function TxStatusMessage({ txStatus }: Props) {
  if (txStatus) {
    return (
      <>
        <Typography variant="body1">Transaction status:</Typography>
        <Typography variant="caption" color="green">
          {txStatus}
        </Typography>
      </>
    );
  }

  return;
}
