import { Grid, Typography } from "@mui/material";

import { truncateAddress } from "@/utils/formatString";

import { DEFAULT_COL_WIDTH, StyledTypography } from "./styled";

type ReceivedDetailProps = { address: string };

export const ReceivedDetail = (data: ReceivedDetailProps) => {
  const { address } = data;
  const dumpData = {
    txHash: truncateAddress(address, 16),
    safeTxHahs: 15,
    created: "Sep 10, 2023 - 12:53:00 PM",
    executed: "Sep 10, 2023 - 12:53:00 PM",
  };

  return (
    <>
      <Grid container>
        <Grid item {...DEFAULT_COL_WIDTH.name}>
          <StyledTypography>Transaction hash:</StyledTypography>
        </Grid>
        <Grid item {...DEFAULT_COL_WIDTH.value}>
          <Typography>{dumpData.txHash}</Typography>
        </Grid>
        <Grid item {...DEFAULT_COL_WIDTH.name}>
          <StyledTypography>safeTxHash: </StyledTypography>
        </Grid>
        <Grid item {...DEFAULT_COL_WIDTH.value}>
          <Typography>{dumpData.safeTxHahs}</Typography>
        </Grid>
        <Grid item {...DEFAULT_COL_WIDTH.name}>
          <StyledTypography>Created: </StyledTypography>
        </Grid>
        <Grid item {...DEFAULT_COL_WIDTH.value}>
          <Typography>{dumpData.created}</Typography>
        </Grid>
        <Grid item {...DEFAULT_COL_WIDTH.name}>
          <StyledTypography>Executed: </StyledTypography>
        </Grid>
        <Grid item {...DEFAULT_COL_WIDTH.value}>
          <Typography>{dumpData.executed}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
