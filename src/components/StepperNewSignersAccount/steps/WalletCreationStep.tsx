import { Box, Link, TextField, Typography } from "@mui/material";

import NetworkBadge from "@/components/NetworkBadge";
import { CHAINS_ALLOWED, getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { ValidationError } from "@/hooks/signatoriesAccount/useFormSignersAccountState";

function WalletCreationStep({
  walletName,
  handleWalletName,
  errors,
  step,
  account,
}: {
  walletName: string;
  handleWalletName: (name: string, step: number) => void;
  errors: Array<ValidationError[]>;
  step: number;
  account?: SignatoriesAccount;
}) {
  const { network } = usePolkadotContext();
  const networkName = (network && getChain(network)?.name) || "UNKNOWN";
  const { logo } = CHAINS_ALLOWED.find(
    (chain) => chain.name === networkName
  ) || { logo: { src: "", alt: "" } };
  return (
    <Box mt={3} display="flex" gap={2.25} flexDirection="column">
      <Box display="flex" alignItems="center" gap={1.25}>
        <Typography variant="caption" fontWeight={500} component="div">
          {!account ? "You are on" : "You are importing from"}
        </Typography>
        <NetworkBadge
          name={networkName}
          logo={logo.src}
          logoSize={{ width: 14, height: 14 }}
          description={logo.alt}
        />
      </Box>
      {account && (
        <TextField
          label="XSigners Address"
          defaultValue={account.address}
          fullWidth
          inputProps={{ readOnly: true }}
          margin="normal"
        />
      )}
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
