import {
  Box,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ArrayOneOrMore } from "useink/dist/core";

import NetworkBadge from "@/components/NetworkBadge";
import { getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Owner } from "@/domain/SignatoriesAccount";
import { useFetchSignersAccount } from "@/hooks/signatoriesAccount/useFetchSignersAccount";
import { ValidationError } from "@/hooks/signatoriesAccount/useFormSignersAccountState";
import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";

function WalletImportStep({
  handleWalletName,
  handleOwners,
  handleThreshold,
  errors,
  setErrors,
  step,
  walletName,
  address,
  handleAddress,
}: {
  walletName: string;
  handleWalletName: (name: string, step: number, field?: number) => void;
  handleOwners: (owners: ArrayOneOrMore<Owner>, step: number) => void;
  handleThreshold: (threshold: number) => void;
  handleAddress: (address: string, step: number, field?: number) => void;
  errors: Array<ValidationError[]>;
  setErrors: React.Dispatch<React.SetStateAction<ValidationError[][]>>;
  step: number;
  address: string;
}) {
  const { network } = usePolkadotContext();
  const { data, error, isLoading } = useFetchSignersAccount({
    address,
    walletName,
  });
  const [tempAddress, setTempAddress] = useState(address);
  const { logo, name: networkName } = getChain(network);

  useDebouncedEffect(
    async () => {
      handleAddress(tempAddress, step);
    },
    500, // 500ms delay
    [tempAddress]
  );

  useEffect(() => {
    if (!isLoading && address) {
      if (error || !data) {
        setErrors((prev: Array<Array<ValidationError>>) => {
          const newErrors = [...prev];
          newErrors[step][0] = {
            error: true,
            message: "Multisig not found.",
          };
          return newErrors;
        });
      }
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
    <Box mt={3} display="flex" gap={2.25} flexDirection="column">
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

export default WalletImportStep;
