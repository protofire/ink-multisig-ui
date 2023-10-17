import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const FlexCenterBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  alignItems: "center",
  gap: "4rem",
}));

export const TransactionBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "2rem",
  justifyContent: "center",
  backgroundColor: theme.palette.grey.A100,
}));

export const TypographyBodyStyled = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.common.white,
  })
);
