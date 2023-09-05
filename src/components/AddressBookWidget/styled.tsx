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

const width = "100%";

export const AddressBookWidgetStyled = styled(WidgetCard)<WidgetCardProps>(
  () => ({
    backgroundImage: "none",
    backgroundColor: "transparent",
    boxShadow: "none",
  })
);

export const StyledBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  maxWidth: "600px",
  margin: "0 auto",
  alignItems: "center",
}));

export const StyledStack = styled(Box)<BoxProps>(() => ({
  minWidth: "220px",
  marginLeft: "1rem",

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
  width,
}));

export const ListItemstyled = styled(ListItem)<ListItemProps>(() => ({
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
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));

export const IconBoxStyled = styled(Box)<BoxProps>(() => ({
  display: "flex",
  alignItems: "center",
  width: "80px",

  "& svg": {
    cursor: "pointer",
    color: "#848484",
  },

  "& svg:last-child": {
    marginLeft: "-13px",
  },
}));

export const NetworkBoxStyled = styled(Box)<BoxProps>(() => ({
  display: "flex",
  alignItems: "center",

  "& p": {
    marginLeft: "0.5rem",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },

  "& img": {
    width: "20px",
    height: "20px",
  },
}));

export const StyledButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#1a1a1a",
  color: "#FFE873",
  borderRadius: "0px 0px 8px 8px",
  width,
}));
