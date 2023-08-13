import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Link, TextField, Tooltip, Typography } from "@mui/material";

import { getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { ValidationError } from "@/hooks/signatoriesAccount/useFormSignersAccountState";

function WalletCreationStep({
  walletName,
  handleWalletName,
  errors,
  step,
}: {
  walletName: string;
  handleWalletName: (name: string, step: number) => void;
  errors: Array<ValidationError[]>;
  step: number;
}) {
  const { network } = usePolkadotContext();
  const networkName = (network && getChain(network)?.name) || "UNKNOWN";

  return (
    <Box mt={3} display="flex" gap={2.25} flexDirection="column">
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="caption" component="div">
          You are on {networkName}
        </Typography>
        <Tooltip
          placement="right"
          title="This network is the one that has been selected in the top Network selector"
        >
          <HelpOutlineIcon fontSize="small" />
        </Tooltip>
      </Box>
      <TextField
        label="Name"
        error={errors[step][0]?.error}
        helperText={errors[step][0]?.message}
        value={walletName}
        onChange={(e) => handleWalletName(e.target.value, step)}
        fullWidth
        margin="normal"
      />
      <Box mt={5}>
        <Typography
          variant="body1"
          component="div"
          display="flex"
          alignItems="center"
          gap={0.5}
        >
          By continuing, you agree to our
          <Link href="https://app.safe.global/terms">terms of use</Link>
          and
          <Link href="https://app.safe.global/privacy"> privacy policy.</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default WalletCreationStep;
