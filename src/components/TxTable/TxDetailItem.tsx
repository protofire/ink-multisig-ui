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

import {
  TransactionType,
  TransferType,
} from "@/domain/repositores/ITxQueueRepository";
import { formatDate, truncateAddress } from "@/utils/formatString";

import { TxDetails } from "./TxDetail";
import TxStepper from "./TxStepper";

const StyledGrid = styled(Grid)<GridProps>(() => ({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
}));

export type ExtendedDataType = (TransferType & TransactionType) & {
  state: string;
  img: string;
  type: string;
  to: string;
  txMsg: string;
  txStateMsg: string;
};

type Props = {
  data: ExtendedDataType;
  index: number;
};

export const TxDetailItem = ({ data, index }: Props) => {
  const date = formatDate(data.creationTimestamp);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
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
            {/* //TODO: txId is mising in  Transfer type*/}
            <Typography>{index + 1}</Typography>
          </StyledGrid>
          <StyledGrid item xs={1} sm={1} md={1}>
            <Image src={data.img} priority width={30} height={30} alt="test" />
          </StyledGrid>
          <StyledGrid
            item
            xs={4}
            sm={4}
            md={4}
            style={{ justifyContent: "left" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>{data.type}</span>
              <span style={{ fontSize: "0.9rem" }}>
                {data.txMsg} : {truncateAddress(data.to, 9)}
              </span>
            </Box>
          </StyledGrid>
          <StyledGrid item xs={1} sm={1} md={1}>
            <Typography>
              {data.type === "Receive" ? "+" : "-"}
              {data.value}
            </Typography>
          </StyledGrid>
          <StyledGrid item xs={2} sm={2} md={2}>
            <Typography>{date}</Typography>
          </StyledGrid>
          <StyledGrid item xs={3} sm={3} md={3}>
            <Typography
              color={data.state === "Successfull" ? "#ADD500" : "#FF9C7D"}
            >
              {data.txStateMsg}
            </Typography>
          </StyledGrid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: "#201A1B", padding: "0px" }}>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <TxDetails data={data} />
          {data.type !== "Receive" ? <TxStepper data={data} /> : <></>}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
