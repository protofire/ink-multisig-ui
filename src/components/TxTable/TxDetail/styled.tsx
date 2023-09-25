import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/material";

export const DEFAULT_COL_WIDTH = {
  name: {
    xs: 3,
    sm: 3,
    md: 3,
  },
  value: {
    xs: 9,
    sm: 9,
    md: 9,
  },
};

export const StyledTypography = styled(Typography)<TypographyProps>(() => ({
  color: "#837376",
}));
