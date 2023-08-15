import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxContenCentered = styled(Box)<BoxProps>({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
});
