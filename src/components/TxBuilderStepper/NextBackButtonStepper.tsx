import { East as EastIcon, West as WestIcon } from "@mui/icons-material";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/system";

import {
  LoadingButton,
  LoadingButtonProps,
} from "@/components/common/LoadingButton";
import {
  FooterButton,
  StepperFooter,
} from "@/components/StepperSignersAccount/styled";

export type NextBackButtonStepperProps = {
  backLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  activeStep: number;
  stepsLength: number;
  handleBack: () => void;
  handleNext?: (props?: unknown) => void;
  isNextDisabled?: boolean;
  //   isDoingNext?: boolean;
  nextButtonProps?: LoadingButtonProps & { disabled: boolean };
  backButtonProps?: LoadingButtonProps & { disabled: boolean };
  hiddenBack?: boolean;
};

const BoxStyled = styled(Box)<BoxProps>(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-evenly",
  alignItems: "center",
}));

export function NextBackButtonStepper({
  backLabel = (
    <>
      <WestIcon />
      {"Back"}
    </>
  ),
  nextLabel = (
    <>
      {"Next"}
      <EastIcon />
    </>
  ),
  activeStep,
  stepsLength,
  handleBack,
  handleNext,
  isNextDisabled,
  hiddenBack,
  nextButtonProps,
}: NextBackButtonStepperProps) {
  const _nextLabel =
    activeStep === stepsLength - 1 && nextLabel === "next"
      ? "Confirm"
      : nextLabel;

  return (
    <StepperFooter mt={2}>
      {hiddenBack ? (
        <Box sx={{ width: "30%" }} />
      ) : (
        <FooterButton width={134} variant="outlined" onClick={handleBack}>
          <BoxStyled>{backLabel}</BoxStyled>
        </FooterButton>
      )}
      {activeStep <= stepsLength - 1 && (
        <LoadingButton
          variant="contained"
          onClick={handleNext}
          disabled={isNextDisabled}
          sx={{ minWidth: "8rem" }}
          {...nextButtonProps}
        >
          <BoxStyled>{_nextLabel}</BoxStyled>
        </LoadingButton>
      )}
    </StepperFooter>
  );
}
