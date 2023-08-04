import { Box, TextField } from "@mui/material";

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
  errors: ValidationError[];
  step: number;
}) {
  const { network } = usePolkadotContext();
  return (
    <Box>
      <TextField
        label="Name"
        error={errors[0]?.error}
        helperText={errors[0]?.message}
        value={walletName}
        onChange={(e) => handleWalletName(e.target.value, step)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Network"
        defaultValue={network}
        placeholder="Network"
        disabled
        fullWidth
        helperText="This network is the one that has been selected in the top Network selector"
        margin="normal"
        inputProps={{ readOnly: true }}
      />
    </Box>
  );
}

export default WalletCreationStep;
