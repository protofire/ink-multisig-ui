import {
  Box,
  BoxProps,
  List,
  ListProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { WidgetCard, WidgetCardProps } from "../common/muiExtended/WidgetCard";

export const AddressBookWidgetStyled = styled(WidgetCard)<WidgetCardProps>(
  () => ({
    backgroundImage: "none",
    backgroundColor: "transparent",
  })
);

export const TextSummary = styled(Typography)<TypographyProps>(() => ({
  color: "#FFE873",
  fontSize: "2em",
}));

export const ListItemtyled = styled(List)<ListProps>(() => ({
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
    borderRadius: "0px 0px 8px 8px",
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
