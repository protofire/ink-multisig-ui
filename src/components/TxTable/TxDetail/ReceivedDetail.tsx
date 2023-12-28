import { Grid } from "@mui/material";

import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { formatDate } from "@/utils/formatString";

import { CustomGridItem } from "./styled";

export const ReceivedDetail = ({
  data,
}: {
  data: TransactionProposedItemUi;
}) => {
  const date = formatDate(data.creationTimestamp);

  return (
    <>
      <Grid container>
        <CustomGridItem colType="name">Created at:</CustomGridItem>
        <CustomGridItem colType="value">{date}</CustomGridItem>
        <CustomGridItem colType="name">Transaction hash</CustomGridItem>
        <CustomGridItem colType="value">{data.proposalTxHash}</CustomGridItem>
      </Grid>
    </>
  );
};
