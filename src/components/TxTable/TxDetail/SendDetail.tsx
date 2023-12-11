import { Box, Grid } from "@mui/material";

import { AccountAvatar } from "@/components/AddressAccountSelect/AccountAvatar";
import CopyButton from "@/components/common/CopyButton";
import OpenNewTabButton from "@/components/common/OpenNewTabButton";
import { formatDate } from "@/utils/formatString";

import { ExtendedDataType } from "../TxDetailItem";
import { CustomGridItem } from "./styled";

export const SendDetail = ({ data }: { data: ExtendedDataType }) => {
  const date = formatDate(data.creationTimestamp);

  return (
    <Grid container>
      <CustomGridItem colType="name">Created at:</CustomGridItem>
      <CustomGridItem colType="value">{date}</CustomGridItem>
      <CustomGridItem colType="name">Created by:</CustomGridItem>
      <CustomGridItem
        colType="value"
        sx={{ margin: "22px 0px", display: "flex" }}
      >
        <Box sx={{ display: "flex" }}>
          <AccountAvatar
            address={data.proposer}
            name={""}
            truncateLenght={8}
          ></AccountAvatar>
          <Box sx={{ marginTop: "20px", marginLeft: "15px" }}>
            <CopyButton text={data.proposer} />
            <OpenNewTabButton text={data.proposer} />
          </Box>
        </Box>
      </CustomGridItem>
      <CustomGridItem colType="name">Transaction hash:</CustomGridItem>
      <CustomGridItem colType="value">{data.id}</CustomGridItem>
    </Grid>
  );
};
