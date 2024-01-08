import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  StepLabel,
  StepLabelProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StepperFooter = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
}));

export const StyledBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const FlexCenterBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0",
  },
}));

export const FooterButton = styled(Button)<ButtonProps & { width?: number }>(
  ({ theme, variant, width }) => ({
    width: width ? `${width}px` : "auto",
    color:
      variant === "outlined"
        ? theme.palette.primary.main
        : theme.palette.common.black,
  })
);

export const StyledStepLabel = styled(StepLabel)<
  StepLabelProps & { active: number; completed: number }
>(({ theme, active, completed }) => ({
  ".MuiStepLabel-label p": {
    color: active || completed ? theme.palette.primary.main : "inherit",
    fontWeight: active || completed ? "bold" : "normal",
  },
  ".Mui-active .MuiStepIcon-text": {
    fill: theme.palette.common.black,
    fontWeight: "bold",
  },
}));
