import { Grid } from "@mui/material";

import { truncateAddress } from "@/utils/formatString";

import { CustomGridItem } from "./styled";

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
        <CustomGridItem colType="name">Transaction hash</CustomGridItem>
        <CustomGridItem colType="value">{dumpData.txHash}</CustomGridItem>
        <CustomGridItem colType="name">safeTxHash:</CustomGridItem>
        <CustomGridItem colType="value">{dumpData.safeTxHahs}</CustomGridItem>
        <CustomGridItem colType="name">Created:</CustomGridItem>
        <CustomGridItem colType="value">{dumpData.created}</CustomGridItem>
        <CustomGridItem colType="name">Executed:</CustomGridItem>
        <CustomGridItem colType="value">{dumpData.executed}</CustomGridItem>
      </Grid>
    </>
  );
};
