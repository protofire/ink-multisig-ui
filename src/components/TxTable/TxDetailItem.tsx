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

import { truncateAddress } from "@/utils/formatString";

import { TxDetails } from "./TxDetail";
import { txType } from "./TxDetail/types";
import TxStepper from "./TxStepper";

const StyledGrid = styled(Grid)<GridProps>(() => ({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
}));

type Props = {
  data: {
    nonce: number;
    status: string;
    address: string;
    value: number;
    token: string;
  };
  txData: {
    img: string;
    type: string;
  };
  txType: txType;
};

export const TxDetailItem = ({ data, txData, txType }: Props) => {
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
            <Typography>{data.nonce}</Typography>
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
              <span>{txData.type}</span>
              <span style={{ fontSize: "0.9rem" }}>
                to: {truncateAddress(data.address, 14)}
              </span>
            </Box>
          </StyledGrid>
          <StyledGrid item xs={1} sm={1} md={1}>
            <Typography>
              {`${data.status === "EXECUTED_SUCCESS" ? "" : "-"}  ${
                data.value
              } ${data.token}`}
            </Typography>
          </StyledGrid>
          <StyledGrid item xs={2} sm={2} md={2}>
            <Typography>7:20 PM</Typography>
          </StyledGrid>
          <StyledGrid item xs={3} sm={3} md={3}>
            <Typography color={"#FF9C7D"}>Awaiting Confirmations</Typography>
          </StyledGrid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: "#201A1B", padding: "0px" }}>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <TxDetails type={txType}></TxDetails>
          <TxStepper></TxStepper>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
