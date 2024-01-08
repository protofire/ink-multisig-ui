import { Box, Grid } from "@mui/material";
import { ChainId } from "useink/dist/chains";

import CopyButton from "@/components/common/CopyButton";
import { ExplorerLink } from "@/components/ExplorerLink";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { formatDate } from "@/utils/formatString";

import { CustomGridItem } from "./styled";

export const ReceivedDetail = ({
  data,
  network,
}: {
  data: TransactionProposedItemUi;
  network: ChainId;
}) => {
  const date = formatDate(data.creationTimestamp);

  return (
    <>
      <Grid container>
        <CustomGridItem colType="name">Created at:</CustomGridItem>
        <CustomGridItem colType="value">{date}</CustomGridItem>
        <CustomGridItem colType="name">Transaction hash: </CustomGridItem>
        <CustomGridItem colType="value">
          <Box
            sx={{
              minWidth: 0,
              minHeight: 0,
              wordWrap: "break-word",
              wordBreak: "break-all",
              maxWidth: "100%",
            }}
          >
            {data.id}{" "}
            <Box display={"inline-block"}>
              <CopyButton text={data.id} />
              <ExplorerLink
                blockchain={network}
                path="extrinsic"
                txHash={data.id}
                sx={{ color: "" }}
              />
            </Box>
          </Box>
        </CustomGridItem>
        <CustomGridItem colType="name">Value:</CustomGridItem>
        <CustomGridItem colType="value">
          {data.value ?? data.valueAmount}
        </CustomGridItem>
      </Grid>
    </>
  );
};
