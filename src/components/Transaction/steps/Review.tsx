import { Avatar, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { AccountSigner } from "@/components/StepperSignersAccount/AccountSigner";
import { getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";

import { FlexCenterBox, StyledBox } from "../styled";

type Props = {
  setField: (field: string, value: string | number) => void;
  setErrors: (errors: string[]) => void;
  errors: string[];
  amount: string;
  to: string;
};

export const ReviewTokens = (props: Props) => {
  const { to, amount } = props;
  const { network } = usePolkadotContext();
  const theme = useTheme();
  const chain = getChain(network);

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
              <Typography color={theme.palette.common.white} variant="body1">
                {chain?.name}
              </Typography>
              <Typography
                color={theme.palette.common.white}
                fontWeight="bold"
                variant="body1"
              >
                {amount}
              </Typography>
            </Typography>
          </FlexCenterBox>
        </StyledBox>
      </Box>
    </Box>
  );
};
