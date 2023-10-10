import { Box, BoxProps } from "@mui/material";
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
