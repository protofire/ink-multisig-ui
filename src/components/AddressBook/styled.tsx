import { List, ListItem, ListItemProps, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";

import { WidgetCard, WidgetCardProps } from "../common/muiExtended/WidgetCard";

const width = "100%";

export const AddressBookWidgetStyled = styled(WidgetCard)<WidgetCardProps>(
  () => ({
    backgroundImage: "none",
    boxShadow: "none",
  })
);

export const StyledList = styled(List)<TypographyProps>(() => ({
  paddingBottom: "0",
  width,
}));

export const NoItems = styled(ListItem)<ListItemProps>(() => ({
  backgroundColor: "#1a1a1a",
  borderRadius: "8px",
  minHeight: "15rem",
  justifyContent: "center",
}));
