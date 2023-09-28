import { Grid, Typography } from "@mui/material";

import { DEFAULT_COL_WIDTH } from "./styled";

type Props = { data: undefined };

const advancedDetails = [
  {
    name: "Operation:",
    value: "0(call)",
  },
  {
    name: "safeTxGas:",
    value: "59786",
  },
  {
    name: "baseGas:",
    value: "0",
  },
  {
    name: "gasPrice:",
    value: "0",
  },
  {
    name: "gasToken:",
    value: "0x0000...0000",
  },
  {
    name: "refundReceiver:",
    value: "0x0000...0000",
  },
  {
    name: "Signature 1:",
    value: "65 bytes",
  },
  {
    name: "Raw data:",
    value: "68 bytes",
  },
];

export const AdvancedDetail = (data: Props) => (
  <Grid container>
    {advancedDetails.map((detail) => (
      <>
        <Grid item {...DEFAULT_COL_WIDTH.name}>
          <Typography color="#837376">{detail.name}</Typography>
        </Grid>
        <Grid item {...DEFAULT_COL_WIDTH.value}>
          <Typography>{detail.value}</Typography>
        </Grid>
      </>
    ))}
  </Grid>
);
