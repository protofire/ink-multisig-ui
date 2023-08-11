import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";

export const StyledBox = styled(Box)<BoxProps>(() => ({
  display: "inline-block",
  lineHeight: 0,
  "> .container": {
    position: "relative",
    "> div,> svg": {
      position: "relative",
    },
    "&.highlight:before": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "50%",
      boxShadow: "0 0 5px 2px #aaa",
      content: "''",
    },
  },
}));
