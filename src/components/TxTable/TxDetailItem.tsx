import styled from "@emotion/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  GridProps,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { ChainId } from "useink/dist/chains";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";
import { TX_TYPE_OPTION } from "@/hooks/txQueue/useListTxQueue";
import { ContractPromise } from "@/services/substrate/types";
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
  index: number;
  network: ChainId;
  multisigContractPromise: ContractPromise;
};

export const TxDetailItem = ({
  txData,
  index,
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

  const txStateMsg =
    txData.status === TX_TYPE_OPTION.STATUS.PROPOSED
      ? "Awaiting Confirmations"
      : "Success";

  const successTx =
    txData.status === TX_TYPE_OPTION.STATUS.EXECUTED_SUCCESS ||
    txData.type === TX_TYPE_OPTION.RECEIVE;

  if (!txData.type) {
    return (
      <Accordion
        key={txData.txId}
        expanded={expanded}
        onChange={handleChange(txData.txId)}
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
        aria-controls={`${txData.id}-content`}
        id={`${txData.id}-header`}
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
            <Typography>{index + 1}</Typography>
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
              <span>{txData.type}</span>
              <span style={{ fontSize: "0.9rem" }}>
                {txData.txMsg} : {truncateAddress(txData.from ?? txData.to, 9)}
              </span>
            </Box>
          </StyledGrid>
          <StyledGrid item xs={2} sm={2} md={2}>
            <Typography>
              {txData.type === TX_TYPE_OPTION.RECEIVE ? `+` : "-"}
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
          <TxDetails data={txData} network={network} />
          {txData.type !== TX_TYPE_OPTION.RECEIVE ? (
            <TxStepper
              approvalCount={txData.approvalCount}
              owners={txData.ownersAction}
              network={network}
              txId={txData.txId}
              multisigContractPromise={multisigContractPromise}
              expanded={expanded}
            />
          ) : (
            <></>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
