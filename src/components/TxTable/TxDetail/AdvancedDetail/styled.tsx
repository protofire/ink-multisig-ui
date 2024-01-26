import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionDetails, {
  AccordionDetailsProps,
} from "@mui/material/AccordionDetails";
import AccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";

export const DetailsAccordion = styled(Accordion)<AccordionProps>(() => ({
  boxShadow: "none",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
  },
}));

export const DetailsAccordionSummary = styled(
  (props: AccordionSummaryProps) => (
    <AccordionSummary expandIcon={<ArrowBackIosIcon />} {...props} />
  )
)(() => ({
  backgroundColor: "inherit",
  boxShadow: "none",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
  padding: 0,
}));

export const DetailsAccordionContent = styled(
  AccordionDetails
)<AccordionDetailsProps>(() => ({
  backgroundColor: "#201A1B",
  padding: 0,
}));
