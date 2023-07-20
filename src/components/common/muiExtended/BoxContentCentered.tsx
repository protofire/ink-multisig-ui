import { Box, BoxProps, styled } from "@mui/material";

export const BoxContenCentered = styled(Box)<BoxProps>({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
  gap: "2rem",
  height: "100%",
});
