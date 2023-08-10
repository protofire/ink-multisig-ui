import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StepperFooter = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  gap: "2rem",
}));

export const StyledBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: "5px",
  flexDirection: "column",
}));

export const FlexCenterBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
