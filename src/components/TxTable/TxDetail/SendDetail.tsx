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
          <Box display={"inline-block"}>
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
    </Grid>
  );
};
