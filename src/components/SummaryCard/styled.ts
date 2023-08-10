import { styled, Typography, TypographyProps } from "@mui/material";

import { WidgetCard, WidgetCardProps } from "../common/muiExtended/WidgetCard";

export const SummaryCardStyled = styled(WidgetCard)<WidgetCardProps>(() => ({
  minHeight: "9rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  minWidth: "180px",
}));

export const TextSummary = styled(Typography)<TypographyProps>(() => ({
  fontSize: "2em",
}));
