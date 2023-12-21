import { alpha, styled } from "@mui/material/styles";

import { StyledTextField } from "@/components/TextFieldWithLoading";

export const MinimalTextField = styled(StyledTextField)(({ theme }) => ({
  border: "none",
  backgroundColor: alpha(theme.palette.primary.light, 0.1),
  color: theme.palette.primary.main,
  "& .MuiOutlinedInput-root fieldset": {
    borderColor: "transparent !important",
  },
}));
