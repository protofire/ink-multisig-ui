import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";

export const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});
