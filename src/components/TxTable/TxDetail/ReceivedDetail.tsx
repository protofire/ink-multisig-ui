import { Grid } from "@mui/material";

import { ExtendedDataType } from "@/domain/repositores/ITxQueueRepository";
import { formatDate } from "@/utils/formatString";

import { CustomGridItem } from "./styled";

export const ReceivedDetail = ({ data }: { data: ExtendedDataType }) => {
  const date = formatDate(data.creationTimestamp);

  return (
    <>
      <Grid container>
        <CustomGridItem colType="name">Created:</CustomGridItem>
        <CustomGridItem colType="value">{date}</CustomGridItem>
        <CustomGridItem colType="name">Transaction hash</CustomGridItem>
        <CustomGridItem colType="value">{data.proposalTxHash}</CustomGridItem>
      </Grid>
    </>
  );
};
