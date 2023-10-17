import { Avatar, Box, Typography } from "@mui/material";

import { AccountSigner } from "@/components/StepperSignersAccount/AccountSigner";
import { ChainExtended } from "@/config/chain";

import { FlexCenterBox, StyledBox, TypographyBodyStyled } from "../styled";

type Props = {
  setField: (field: string, value: string | number) => void;
  setErrors: (errors: string[]) => void;
  errors: string[];
  amount: string;
  to: string;
  chain: ChainExtended;
};

export const ReviewTokens = (props: Props) => {
  const { to, amount, chain } = props;

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h4">Review</Typography>
        <StyledBox mt={5} mb={1} gap={4}>
          <FlexCenterBox>
            <Typography variant="h6" width={200}>
              To:
            </Typography>
            <Typography component="div">
              <AccountSigner
                key={to}
                name="Signer 1"
                address={to}
                truncateAmount={12}
              />
            </Typography>
          </FlexCenterBox>
          <FlexCenterBox>
            <Typography variant="h6" width={200}>
              Send:
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              gap={1}
              component="div"
            >
              <Avatar src={chain?.logo.src} alt={chain?.logo.alt} />
              <TypographyBodyStyled variant="body1">
                {chain?.name}
              </TypographyBodyStyled>
              <TypographyBodyStyled fontWeight="bold" variant="body1">
                {amount}
              </TypographyBodyStyled>
            </Typography>
          </FlexCenterBox>
        </StyledBox>
      </Box>
    </Box>
  );
};
