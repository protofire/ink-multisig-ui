import {
  Box,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import NetworkBadge from "@/components/NetworkBadge";
import { getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import { useFindXsignerOwners } from "@/hooks/xsignerOwners/useFindXsignerOwners";
import {
  UseFormSignersAccountStateReturn,
  ValidationError,
} from "@/hooks/xsignersAccount/useFormSignersAccountState";

function WalletImportStep({
  handleWalletName,
  handleOwners,
  handleThreshold,
  setErrors,
  errors,
  step,
  walletName,
  address,
  handleAddress,
}: UseFormSignersAccountStateReturn & { step: number }) {
  const { network } = usePolkadotContext();
  const { data, error, isLoading } = useFindXsignerOwners({
    address,
    walletName,
  });

  const [tempAddress, setTempAddress] = useState(address);
  const { logo, name: networkName } = getChain(network);

  useDebouncedEffect({
    effect: async () => {
      if (!tempAddress) return;
      handleAddress(tempAddress, step);
    },
    delay: 500, // 500ms delay
    deps: [tempAddress],
  });

  useEffect(() => {
    if (!isLoading && address) {
      const isNotFound = error || !data;
      setErrors((prev: Array<Array<ValidationError>>) => {
        const newErrors = [...prev];
        newErrors[step][0] = {
          error: !!isNotFound,
          message: isNotFound ? "Multisig not found." : "",
        };
        return newErrors;
      });
    }
  }, [error, isLoading, data, address, setErrors, step]);

  useEffect(() => {
    handleAddress(address, step);
  }, []);

  useEffect(() => {
    if (data && !error) {
      handleWalletName(data.name, step, 1);
      handleOwners(data.owners, step + 1);
      handleThreshold(data.threshold);
    }
  }, [data, error, handleThreshold, handleWalletName, handleOwners, step]);

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      <Box display="flex" alignItems="center" gap={1.25}>
        <Typography variant="body1" component="p">
          You are importing from
        </Typography>
        <NetworkBadge
          name={networkName}
          logo={logo.src}
          logoSize={{ width: 20, height: 20 }}
          description={logo.alt}
        />
      </Box>
      <TextField
        label="XSigners Address"
        defaultValue={tempAddress}
        onChange={(e) => setTempAddress(e.target.value)}
        fullWidth
        margin="normal"
        error={errors[step][0]?.error}
        helperText={errors[step][0]?.message}
        InputProps={{
          endAdornment: isLoading && <CircularProgress size={20} />,
        }}
      />
      <TextField
        label="Name"
        autoFocus
        error={errors[step][1]?.error}
        helperText={errors[step][1]?.message}
        value={walletName}
        onChange={(e) => handleWalletName(e.target.value, step, 1)}
        fullWidth
        margin="normal"
      />
      <Box mt={4}>
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

export default WalletImportStep;
