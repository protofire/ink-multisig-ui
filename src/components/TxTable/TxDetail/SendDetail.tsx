import { Box, Grid } from "@mui/material";
import { ChainId } from "useink/dist/chains";

import { AccountAvatar } from "@/components/AddressAccountSelect/AccountAvatar";
import CopyButton from "@/components/common/CopyButton";
import { ExplorerLink } from "@/components/ExplorerLink";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { formatDate } from "@/utils/formatString";

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
        <Box sx={{ display: "flex" }}>
          <AccountAvatar
            address={data.proposer}
            name={""}
            truncateLenght={8}
          ></AccountAvatar>
          <Box sx={{ marginTop: "4px", marginLeft: "8px", display: "flex" }}>
            <CopyButton text={data.proposer} />
            <ExplorerLink
              blockchain={network}
              path="account"
              txHash={data.proposer}
              sx={{ color: "" }}
            />
          </Box>
        </Box>
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
          borderColor={"red"}
          borderRadius={"0.4rem"}
          bgcolor={(theme) => theme.palette.error.main + "40"}
          color={"red"}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12} textAlign={"center"}>
              Error: {data.error}
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </Grid>
  );
};
