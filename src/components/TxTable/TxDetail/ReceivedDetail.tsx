import { Grid } from "@mui/material";
import { ChainId } from "useink/dist/chains";

import { ExtendedDataType } from "@/domain/repositores/ITxQueueRepository";
import { formatDate } from "@/utils/formatString";

import { CustomGridItem } from "./styled";

export const ReceivedDetail = ({
  data,
  network,
}: {
  data: ExtendedDataType;
  network: ChainId;
}) => {
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
