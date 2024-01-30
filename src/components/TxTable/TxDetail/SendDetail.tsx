import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Grid } from "@mui/material";
import { ChainId } from "useink/dist/chains";

import CopyButton from "@/components/common/CopyButton";
import { ExplorerLink } from "@/components/ExplorerLink";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { formatDate } from "@/utils/formatString";

import { AccountExplorer } from ".";
import { CustomGridItem } from "./styled";

export const SendDetail = ({
  data,
  network,
}: {
  data: TransactionProposedItemUi;
  network: ChainId;
}) => {
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
        <AccountExplorer
          address={data.proposer}
          name=""
          network={network}
          containerProps={{ display: "flex" }}
          boxActionsProps={{
            marginTop: "4px",
            marginLeft: "8px",
            display: "flex",
          }}
        />
      </CustomGridItem>
      <CustomGridItem colType="name">Transaction hash:</CustomGridItem>
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
          {data.proposalTxHash}{" "}
          <Box display={"inline-block"} sx={{ padding: "0.6em 0" }}>
            <CopyButton text={data.proposalTxHash} />
            <ExplorerLink
              blockchain={network}
              path="extrinsic"
              txHash={data.proposalTxHash}
              sx={{ color: "" }}
            />
          </Box>
        </Box>
      </CustomGridItem>
      {data.error ? (
        <Box
          width={"100%"}
          p={1.3}
          border={"1px solid"}
          borderColor={(theme) => theme.palette.error.main + "90"}
          borderRadius={"0.4rem"}
          bgcolor={(theme) => theme.palette.error.main + "10"}
          color={(theme) => theme.palette.error.main}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
            >
              <ErrorOutlineIcon sx={{ fontSize: "1.3rem" }} />
              Error: {data.error}
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </Grid>
  );
};
