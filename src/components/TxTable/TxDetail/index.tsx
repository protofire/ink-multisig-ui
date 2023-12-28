import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { ChainId } from "useink/dist/chains";

import { AccountAvatar } from "@/components/AddressAccountSelect/AccountAvatar";
import CopyButton from "@/components/common/CopyButton";
import { ExplorerLink } from "@/components/ExplorerLink";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { TX_TYPE_OPTION } from "@/hooks/txQueue/useListTxQueue";

import { AdvancedDetail } from "./AdvancedDetail";
import { ReceivedDetail } from "./ReceivedDetail";
import { SendDetail } from "./SendDetail";

interface Props {
  data: TransactionProposedItemUi;
  network: ChainId;
}

export const TxDetails = ({ data, network }: Props) => {
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);
  const TxComponentType = ({ data }: Props): JSX.Element => {
    if (data.type === TX_TYPE_OPTION.RECEIVE) {
      return <ReceivedDetail data={data} />;
    }
    return <SendDetail data={data} network={network} />;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#201A1B",
        width: "72%",
      }}
    >
      <Box p={4}>
        {data.type === TX_TYPE_OPTION.SEND ? (
          <>
            <Typography color="white" mb={1}>
              {data.type}{" "}
              <span
                style={{ fontWeight: "bold" }}
              >{`${data.valueAmount}`}</span>{" "}
              {data.txMsg}
            </Typography>

            <Box
              sx={{
                display: "flex",
                position: "relative",
              }}
            >
              <AccountAvatar
                address={data.from ?? data.to}
                name={""}
                truncateLenght={16}
              ></AccountAvatar>
              <Box
                sx={{ marginTop: "4px", marginLeft: "15px", display: "flex" }}
              >
                <CopyButton text={data?.from ?? data.to} />
                <ExplorerLink
                  blockchain={network}
                  path="account"
                  txHash={data.from ?? data.to}
                  sx={{ color: "" }}
                />
              </Box>
            </Box>
          </>
        ) : (
          <Typography color="white" mb={1}>
            Contract interaction with{" "}
            <span style={{ fontWeight: "bold" }}>{data.type}</span>
          </Typography>
        )}
        <Box mt={4}>
          <TxComponentType data={data} network={network} />

          {data.selector ? (
            <>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  marginTop: "22px",
                  marginBottom: "22px",
                  cursor: "pointer",
                  color: "#ffe873",
                  textDecoration: "underline",
                }}
                onClick={() => setShowAdvancedDetails(!showAdvancedDetails)}
              >
                {"Advanced Details"}
              </Typography>
              {!showAdvancedDetails ? <AdvancedDetail data={data} /> : null}
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
