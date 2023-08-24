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

export const TransactionQueueStyled = styled(WidgetCard)<WidgetCardProps>(
  () => ({
    backgroundImage: "none",
    backgroundColor: "transparent",
    boxShadow: "none",
  })
);

export const StyledBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  margin: "0 auto",
  justifyItems: "center",
  alignItems: "center",
}));

export const StyledStack = styled(Box)<BoxProps>(() => ({
  minWidth: "100px",
  width: "230px",
  marginLeft: "1.5rem",

  "& span": {
    fontSize: "0.875rem",
    fontWeight: "600",
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
  height: "70px",
  margin: "3px 0px",
  display: "flex",
  alignContent: "center",
  "&:first-child": {
    borderRadius: "8px 8px 0px 0px",
  },

  "&:last-child": {
    background: "linear-gradient(0deg, #120D0E 0%, #1a1a1a 100%)",
  },
}));

export const NoItems = styled(ListItem)<ListItemProps>(() => ({
  backgroundColor: "#1a1a1a",
  borderRadius: "8px",
}));

export const StyledValueBox = styled(Box)<BoxProps>(() => ({
  fontWeight: "bold",

  "& span": {
    marginLeft: "1.5rem",
    fontSize: "0.9rem",
    fontWeight: "normal",
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
  width: "100%",
}));
