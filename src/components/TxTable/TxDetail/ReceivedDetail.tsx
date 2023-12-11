import { Grid } from "@mui/material";

import { formatDate } from "@/utils/formatString";

import { ExtendedDataType } from "../TxDetailItem";
import { CustomGridItem } from "./styled";

export const ReceivedDetail = ({ data }: { data: ExtendedDataType }) => {
  console.log("receiveDetail", data);
  const date = formatDate(data.creationTimestamp);

  return (
    <>
      <Grid container>
        <CustomGridItem colType="name">Transaction hash</CustomGridItem>
        <CustomGridItem colType="value">{data.id}</CustomGridItem>
        <CustomGridItem colType="name">Created:</CustomGridItem>
        <CustomGridItem colType="value">{date}</CustomGridItem>
      </Grid>
    </>
  );
};
