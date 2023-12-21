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
import { ChainId } from "useink/dist/chains";

import { ExtendedDataType } from "@/domain/repositores/ITxQueueRepository";
import { TX_TYPE_OPTION } from "@/hooks/txQueue/useListTxQueue";
import { formatDate, truncateAddress } from "@/utils/formatString";

import { TxDetails } from "./TxDetail";
import TxStepper from "./TxStepper";

const StyledGrid = styled(Grid)<GridProps>(() => ({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
}));

type Props = {
  data: ExtendedDataType;
  index: number;
  network: ChainId;
};

export const TxDetailItem = ({ data, index, network }: Props) => {
  const date = formatDate(data.creationTimestamp);
  const successTx =
    data.status === TX_TYPE_OPTION.STATUS.EXECUTED_SUCCESS ||
    data.type === TX_TYPE_OPTION.RECEIVE;

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
            <Typography>{index + 1}</Typography>
          </StyledGrid>
          <StyledGrid item xs={1} sm={1} md={1}>
            <Image src={data.img} priority width={30} height={30} alt="test" />
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
              <span>{data.type}</span>
              <span style={{ fontSize: "0.9rem" }}>
                {data.txMsg} : {truncateAddress(data.from ?? data.to, 9)}
              </span>
            </Box>
          </StyledGrid>
          <StyledGrid item xs={2} sm={2} md={2}>
            <Typography>
              {data.type === TX_TYPE_OPTION.RECEIVE ? `+` : "-"}
              {`${data.value} ${data.token}`}
            </Typography>
          </StyledGrid>
          <StyledGrid item xs={3} sm={3} md={3}>
            <Typography>{date}</Typography>
          </StyledGrid>
          <StyledGrid item xs={2} sm={2} md={2}>
            <Typography color={successTx ? "#ADD500" : "#FF9C7D"}>
              {data.txStateMsg}
            </Typography>
          </StyledGrid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: "#201A1B", padding: "0px" }}>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <TxDetails data={data} network={network} />
          {data.type !== TX_TYPE_OPTION.RECEIVE ? (
            <TxStepper data={data.stepperData} network={network} />
          ) : (
            <></>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
