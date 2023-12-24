import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledNumberTextField = styled(TextField)({
  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
    {
      "-webkit-appearance": "none",
      margin: 0,
    },
  "& input[type=number]": {
    "-moz-appearance": "textfield",
  },
});
