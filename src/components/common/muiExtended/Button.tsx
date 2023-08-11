import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ButtonBase = styled(Button)<ButtonProps>({
  textTransform: "none",
  height: "4rem",
  borderRadius: "1rem",
});
