import { Button, ButtonProps, styled } from "@mui/material";

export const ButtonBase = styled(Button)<ButtonProps>({
  textTransform: "none",
  height: "4rem",
  borderRadius: "1rem",
});
