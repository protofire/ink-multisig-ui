import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { ChainId } from "useink/dist/chains";

import { ExplorerLink } from "@/components/ExplorerLink";
import { ExtendedDataType } from "@/domain/repositores/ITxQueueRepository";
import { TX_TYPE_OPTION } from "@/hooks/txQueue/useListTxQueue";

import { AccountAvatar } from "../../AddressAccountSelect/AccountAvatar";
import CopyButton from "../../common/CopyButton";
import { AdvancedDetail } from "./AdvancedDetail";
import { ReceivedDetail } from "./ReceivedDetail";
import { SendDetail } from "./SendDetail";

interface Props {
  data: ExtendedDataType;
  network: ChainId;
}

export const TxDetails = ({ data, network }: Props) => {
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);
  const TxComponentType = ({ data }: Props): JSX.Element => {
    if (data.type === TX_TYPE_OPTION.SEND) {
      return <SendDetail data={data} network={network}></SendDetail>;
    }
    return <ReceivedDetail data={data} network={network}></ReceivedDetail>;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#201A1B",
        width: "72%",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          borderBottom: "3px solid #120D0E",
        }}
      >
        {/* <Typography color="white" mb={1}>
          {data.type}{" "}
          <span
            style={{ fontWeight: "bold" }}
          >{`${data.valueAmount} ${data.token}`}</span>{" "}
          {data.txMsg}
        </Typography> */}
        <Typography color="white" mb={1}>
          {data.type}{" "}
          <span style={{ fontWeight: "bold" }}>{`${data.valueAmount}`}</span>{" "}
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
          <Box sx={{ marginTop: "4px", marginLeft: "15px", display: "flex" }}>
            <CopyButton text={data?.from ?? data.to} />
            <ExplorerLink
              blockchain={network}
              path="account"
              txHash={data.from ?? data.to}
              sx={{ color: "" }}
            />
          </Box>
          {/* <Box
            sx={{
              position: "absolute",
              right: "20px",
              borderRadius: "50%",
              color: "#FFE873",
              backgroundColor: "#352F30",
              width: "36px",
              height: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => openInNewTab(data?.from as string)}
          >
            <ShareIcon></ShareIcon>
          </Box> */}
        </Box>
      </Box>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        {<TxComponentType data={data} network={network}></TxComponentType>}

        {data.__typename === TX_TYPE_OPTION.TRANSACTION ? (
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
            {!showAdvancedDetails ? (
              <AdvancedDetail data={data}></AdvancedDetail>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
