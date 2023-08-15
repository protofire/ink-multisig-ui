import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxContentCentered = styled(Box)<BoxProps>({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
});
