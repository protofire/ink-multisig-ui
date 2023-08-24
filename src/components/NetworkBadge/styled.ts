import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";
import { Stack, StackProps } from "@mui/material";

export const StyledStack = styled(Stack, {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "logoSize",
})<StackProps & { logoSize?: { width: number; height: number } }>(
  ({ logoSize }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: ".25rem",
    "& img": {
      width: logoSize?.width ?? "auto",
      height: logoSize?.height ?? "auto",
    },
  })
);
