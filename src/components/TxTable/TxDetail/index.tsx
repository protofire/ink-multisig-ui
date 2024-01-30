import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import { ChainId } from "useink/dist/chains";

import { AccountAvatar } from "@/components/AddressAccountSelect/AccountAvatar";
import CopyButton from "@/components/common/CopyButton";
import { ExplorerLink } from "@/components/ExplorerLink";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { TX_TYPE } from "@/hooks/transactions/const";

import { NameInAddressBook } from "../NameInAddressBook";
import { AdvancedDetail } from "./AdvancedDetail";
import { ReceivedDetail } from "./ReceivedDetail";
import { SendDetail } from "./SendDetail";

interface Props {
  successTx?: boolean;
  data: TransactionProposedItemUi;
  network: ChainId;
}

interface TxInfoType {
  address: string | undefined;
  name: string;
  network: ChainId;
  containerProps?: BoxProps;
  boxActionsProps?: BoxProps;
}

export const AccountExplorer = ({
  address,
  name,
  network,
  containerProps = {
    display: "flex",
    position: "relative",
  },
  boxActionsProps = {
    marginTop: "4px",
    marginLeft: "15px",
    display: "flex",
  },
}: TxInfoType) => {
  return (
    <Box sx={containerProps}>
      <AccountAvatar address={address!} name={name} truncateLenght={16}>
        <NameInAddressBook recipient={address} />
      </AccountAvatar>
      <Box sx={boxActionsProps}>
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

export const TxDetails = ({ data, network, successTx }: Props) => {
  const TxComponentType = ({ data }: Props): JSX.Element => {
    if (data.type === TX_TYPE.RECEIVE) {
      return <ReceivedDetail data={data} network={network} />;
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
        {data.type !== TX_TYPE.RECEIVE ? (
          <>
            {data.type === TX_TYPE.SEND ? (
              <>
                <Typography color="white" mb={1}>
                  {successTx ? "Sent" : data.type}{" "}
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
          <>
            <Typography color="white" mb={1}>
              {successTx ? "Received" : data.type}{" "}
              <span
                style={{ fontWeight: "bold" }}
              >{`${data.valueAmount}`}</span>{" "}
              {data.txMsg}
            </Typography>
            <AccountExplorer address={data.from} name={""} network={network} />
          </>
        )}
        <Box mt={4}>
          <TxComponentType data={data} network={network} />
          {data.selector ? <AdvancedDetail data={data} /> : null}
        </Box>
      </Box>
    </Box>
  );
};
