import { Box, Link, TextField, Typography } from "@mui/material";

import NetworkBadge from "@/components/NetworkBadge";
import { getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { ValidationError } from "@/hooks/xsignersAccount/useFormSignersAccountState";

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
  const { logo, name: networkName } = getChain(network);

  return (
    <Box mt={3} display="flex" gap={2.25} flexDirection="column">
      <Box display="flex" alignItems="center" gap={1.25}>
        <Typography variant="body1" component="p">
          You are on
        </Typography>
        <NetworkBadge
          name={networkName}
          logo={logo.src}
          logoSize={{ width: 14, height: 14 }}
          description={logo.alt}
        />
      </Box>
      <TextField
        label="Name"
        autoFocus
        error={errors[step][0]?.error}
        helperText={errors[step][0]?.message}
        value={walletName}
        onChange={(e) => handleWalletName(e.target.value, step)}
        fullWidth
        margin="normal"
      />
      <Box mt={5}>
        <Typography
          variant="caption"
          component="p"
          display="flex"
          alignItems="center"
          gap={0.5}
          sx={{ fontSize: "0.875rem" }}
        >
          By continuing, you agree to our
          <Link href="#">terms of use</Link>
          and
          <Link href="#"> privacy policy.</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default WalletCreationStep;
