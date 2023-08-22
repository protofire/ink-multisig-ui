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

  "& span": {
    fontSize: "1rem",
  },

  "& svg": {
    width: "40px",
    marginRight: "1rem",
  },
}));

export const StyledStack = styled(Box)<BoxProps>(() => ({
  paddingTop: "5px",
  minWidth: "280px",
}));

export const StyledList = styled(List)<TypographyProps>(() => ({
  paddingBottom: "0",
  width,
}));

export const ListItemstyled = styled(ListItem)<ListItemProps>(() => ({
  backgroundImage: "none",
  backgroundColor: "#1a1a1a",
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

export const IconBoxStyled = styled(Box)<BoxProps>(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-",
  width: "80px",

  "& svg": {
    cursor: "pointer",
    color: "#848484",
    width: "32px",
  },

  "& svg:last-child": {
    marginLeft: "-13px",
  },
}));

export const NetworkBoxStyled = styled(Box)<BoxProps>(() => ({
  marginLeft: "1.4rem",
  display: "flex",
  alignItems: "center",

  "& p": {
    marginLeft: "0.5rem",
    fontWeight: "bold",
    fontSize: "1rem",
  },

  "& img": {
    width: "25px",
    height: "25px",
  },
}));

export const StyledButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#1a1a1a",
  color: "#FFE873",
  borderRadius: "0px 0px 8px 8px",
  width,
}));
