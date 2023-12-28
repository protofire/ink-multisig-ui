import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { ChainId } from "useink/dist/chains";

import { ExplorerLink } from "@/components/ExplorerLink";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { TX_TYPE_OPTION } from "@/hooks/txQueue/useListTxQueue";

import { AccountAvatar } from "../../AddressAccountSelect/AccountAvatar";
import CopyButton from "../../common/CopyButton";
import { AdvancedDetail } from "./AdvancedDetail";
import { ReceivedDetail } from "./ReceivedDetail";
import { SendDetail } from "./SendDetail";

interface Props {
  data: TransactionProposedItemUi;
  network: ChainId;
}

interface TxInfoType {
  address: string | undefined;
  name: string;
  network: ChainId;
}

export const AccountExplorer = ({ address, name, network }: TxInfoType) => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
      }}
    >
      <AccountAvatar
        address={address!}
        name={name}
        truncateLenght={16}
      ></AccountAvatar>
      <Box sx={{ marginTop: "4px", marginLeft: "15px", display: "flex" }}>
        <CopyButton text={address!} />
        <ExplorerLink
          blockchain={network}
          path="account"
          txHash={address}
          sx={{ color: "" }}
        />
      </Box>
    </Box>
  );
};

export const TxDetails = ({ data, network }: Props) => {
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);
  const TxComponentType = ({ data }: Props): JSX.Element => {
    if (data.type === TX_TYPE_OPTION.RECEIVE) {
      return <ReceivedDetail data={data}></ReceivedDetail>;
    }
    return <SendDetail data={data} network={network}></SendDetail>;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#201A1B",
        width: "72%",
      }}
    >
      <Box p={4}>
        {data.type !== TX_TYPE_OPTION.RECEIVE ? (
          <>
            {data.type === TX_TYPE_OPTION.SEND ? (
              <>
                <Typography color="white" mb={1}>
                  {data.type}{" "}
                  <span
                    style={{ fontWeight: "bold" }}
                  >{`${data.valueAmount}`}</span>{" "}
                  {data.txMsg}
                </Typography>
                <AccountExplorer
                  address={data.to}
                  name={""}
                  network={network}
                />
              </>
            ) : (
              <>
                <Typography color="white" mb={1}>
                  Contract interaction with{" "}
                </Typography>
                <AccountExplorer
                  address={data.contractAddress}
                  name=""
                  network={network}
                />
              </>
            )}
          </>
        ) : (
          <></>
        )}
        <Box mt={4}>
          {<TxComponentType data={data} network={network}></TxComponentType>}
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
    </Box>
  );
};
