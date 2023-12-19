import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  List,
  ListItem,
  ListItemProps,
  TypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { WidgetCard, WidgetCardProps } from "../common/muiExtended/WidgetCard";

export const TxQueueWidgetStyled = styled(WidgetCard)<WidgetCardProps>(() => ({
  backgroundImage: "none",
  backgroundColor: "transparent",
  boxShadow: "none",
}));

export const StyledBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const StyledStack = styled(Box)<BoxProps>(() => ({
  minWidth: "220px",
  marginLeft: "1rem",

  "& span": {
    fontSize: "0.875rem",
    fontWeight: "600",
  },

  "& span:nth-of-type(2)": {
    marginLeft: "0.8rem",
    fontSize: "0.73rem",
  },

  "& p": {
    fontSize: "0.75rem",
    fontWeight: "normal",
  },
}));

export const StyledList = styled(List)<TypographyProps>(() => ({
  paddingBottom: "0",
  width: "100%",
}));

export const ListItemtyled = styled(ListItem)<ListItemProps>(() => ({
  backgroundImage: "none",
  backgroundColor: "#1a1a1a",
  margin: "2px 0px",
  display: "flex",
  alignContent: "center",
  "&:first-of-type": {
    borderRadius: "8px 8px 0px 0px",
  },

  "&:last-child": {
    background: "linear-gradient(0deg, #120D0E 0%, #1a1a1a 100%)",
  },
}));

export const NoItems = styled(ListItem)<ListItemProps>(() => ({
  backgroundColor: "#1a1a1a",
  borderRadius: "8px",
  minHeight: "15rem",
  justifyContent: "center",
}));

export const StyledValueBox = styled(Box)<BoxProps>(() => ({
  fontWeight: "bold",
  display: "flex",
  "& span": {
    marginLeft: "1.5rem",
    fontSize: "0.9rem",
    fontWeight: "normal",
  },
}));

export const StyledButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#1a1a1a",
  borderRadius: "0px 0px 8px 8px",
  width: "100%",
}));
