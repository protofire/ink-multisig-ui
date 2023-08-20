import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  List,
  ListItem,
  ListItemProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { WidgetCard, WidgetCardProps } from "../common/muiExtended/WidgetCard";

const width = "670px";

export const AddressBookWidgetStyled = styled(WidgetCard)<WidgetCardProps>(
  () => ({
    backgroundImage: "none",
    backgroundColor: "transparent",
  })
);

export const StyledBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  margin: "0 auto",
  width,

  "& span": {
    marginTop: "4px",
    fontSize: "19px",
  },
}));

export const TextSummary = styled(Typography)<TypographyProps>(() => ({
  color: "#FFE873",
  fontSize: "2em",
}));

export const StyledList = styled(List)<TypographyProps>(() => ({
  paddingBottom: "0",
  width,
}));

export const ListItemtyled = styled(ListItem)<ListItemProps>(() => ({
  backgroundImage: "none",
  backgroundColor: "#1a1a1a",
  padding: "1rem 2rem",
  margin: "5px 0px",
  display: "flex",
  alignContent: "center",
  "&:first-child": {
    borderRadius: "8px 8px 0px 0px",
  },

  "&:last-child": {
    background: "linear-gradient(0deg, #120D0E 0%, #1a1a1a 100%)",
  },
}));

export const IconBoxStyled = styled(Box)<BoxProps>(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "7rem",

  "& svg": {
    cursor: "pointer",
  },

  "& svg:last-child": {
    marginLeft: "0.5rem",
  },
}));

export const NetworkBoxStyled = styled(Box)<BoxProps>(() => ({
  marginLeft: "1rem",
  display: "flex",
  alignItems: "center",

  "& p": {
    marginLeft: "0.5rem",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
}));

export const StyledButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#1a1a1a",
  borderRadius: "0px 0px 8px 8px",
  width,
}));
