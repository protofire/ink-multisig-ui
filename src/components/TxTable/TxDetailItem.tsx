import styled from "@emotion/styled";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  GridProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { ContractPromise } from "@polkadot/api-contract";
import Image from "next/image";
import { useState } from "react";
import { ChainId } from "useink/dist/chains";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import {
  TransactionDisplayInfo,
  TransactionProposedItemUi,
} from "@/domain/TransactionProposedItemUi";
import { TX_STATUS_TYPE, TX_TYPE } from "@/hooks/transactions/const";
import { formatDate, truncateAddress } from "@/utils/formatString";

import { TxDetails } from "./TxDetail";
import TxStepper from "./TxStepper";

const StyledGrid = styled(Grid)<GridProps>(() => ({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
}));

type Props = {
  txData: TransactionProposedItemUi;
  threshold: number;
  index?: number;
  network: ChainId;
  multisigContractPromise?: ContractPromise;
};

const buildStateMsg = (txType: string, error: string | null) => {
  const msg = {
    PROPOSED: "Awaiting Confirmations",
    EXECUTED_SUCCESS: "Success",
    EXECUTED_FAILURE: (
      <Box
        color={(theme) => theme.palette.error.main}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Tooltip title={error} placement="top">
          <span style={{ display: "flex" }}>
            <ErrorOutlineIcon sx={{ top: "1rem", fontSize: "1.3rem" }} />
            <Typography ml={0.4}>Error</Typography>
          </span>
        </Tooltip>
      </Box>
    ),
    CANCELLED: "Cancelled",
  };

  // This validation assumes that a receive does not have the status property.
  // Receives are always success
  return msg[txType as keyof typeof TX_STATUS_TYPE] ?? "Success";
};

const formatPastTime = (type: keyof TransactionDisplayInfo["type"]) => {
  const mapPastNames = {
    Receive: "Received",
    "Send Native": "Sent Native",
    "Send PSP22": "Sent PSP22",
  };

  return mapPastNames[type] ?? type;
};

const buildItemType = (txData: TransactionProposedItemUi) => {
  const { type, status, methodName } = txData;

  let formatType = type;
  if (!formatType) return undefined;

  const success =
    status === TX_STATUS_TYPE.EXECUTED_SUCCESS || type === TX_TYPE.RECEIVE;

  if (success) {
    formatType = formatPastTime(type as keyof TransactionDisplayInfo["type"]);
  }
  return formatType === "Settings" ? methodName : formatType;
};

export const TxDetailItem = ({
  txData,
  threshold,
  network,
  multisigContractPromise,
}: Props) => {
  const date = formatDate(txData.creationTimestamp);

  const [expandedIds, setExpandedIds] = useState<{ [key: string]: boolean }>(
    {}
  );
  const expanded = !!expandedIds[txData.txId];

  const handleChange =
    (id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedIds((prevExpandedIds) => ({
        ...prevExpandedIds,
        [id]: isExpanded ? true : !prevExpandedIds[id],
      }));
    };

  const txStateMsg = buildStateMsg(txData.status, txData.error);
  const successTx =
    txData.status === TX_STATUS_TYPE.EXECUTED_SUCCESS ||
    txData.type === TX_TYPE.RECEIVE;

  const txType = buildItemType(txData);

  if (!txData.type) {
    return (
      <Accordion
        key={txData.txId ?? txData.id}
        expanded={expanded}
        onChange={handleChange(txData.txId ?? txData.id)}
      >
        <Grid
          sx={{
            "&.MuiGrid-root": {
              padding: "1.3rem",
            },
          }}
          container
        >
          <LoadingSkeleton />
        </Grid>
      </Accordion>
    );
  }

  return (
    <Accordion
      sx={{
        "&.Mui-expanded": {
          border: "1px solid",
          borderColor: "#FFE873",
          borderRadius: "0.2rem",
          background: "#ffe87326",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${txData.txId}-content`}
        id={`${txData.txId}-header`}
      >
        <Grid
          sx={{
            "&.MuiGrid-root": {
              margin: "0px",
            },
            "&.MuiGrid-root .MuiGrid-item": {
              margin: "0px",
              padding: "0px",
            },
          }}
          container
        >
          <StyledGrid item xs={1} sm={1} md={1}>
            <Typography>{txData.txId}</Typography>
          </StyledGrid>
          <StyledGrid item xs={1} sm={1} md={1}>
            <Image
              src={txData.img}
              priority
              width={30}
              height={30}
              alt="test"
            />
          </StyledGrid>
          <StyledGrid
            item
            xs={3}
            sm={3}
            md={3}
            style={{ justifyContent: "left" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>{txType}</span>
              <span style={{ fontSize: "0.9rem" }}>
                {txData.txMsg} : {truncateAddress(txData.from ?? txData.to, 9)}
              </span>
            </Box>
          </StyledGrid>
          <StyledGrid item xs={2} sm={2} md={2}>
            <Typography>
              {txData.type === TX_TYPE.RECEIVE ? `+` : "-"}
              {`${txData.valueAmount}`}
            </Typography>
          </StyledGrid>
          <StyledGrid item xs={3} sm={3} md={3}>
            <Typography>{date}</Typography>
          </StyledGrid>
          <StyledGrid item xs={2} sm={2} md={2}>
            <Typography color={successTx ? "#ADD500" : "#FF9C7D"}>
              {txStateMsg}
            </Typography>
          </StyledGrid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: "#201A1B", padding: "0px" }}>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <TxDetails successTx={successTx} data={txData} network={network} />
          {txData.type !== TX_TYPE.RECEIVE ? (
            <TxStepper
              approvalCount={txData.approvalCount}
              owners={txData.ownersAction}
              threshold={threshold}
              network={network}
              txId={txData.txId}
              multisigContractPromise={multisigContractPromise ?? undefined}
              expanded={expanded}
              status={txData.status}
            />
          ) : null}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
