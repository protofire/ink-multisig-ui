import {
  Avatar,
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import { useEffect, useState } from "react";

import { ChainExtended } from "@/config/chain";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { isValidAddress, splitTokenAmount } from "@/utils/blockchain";

import InputWithMax from "../inputs/InputWithMax";

type Props = {
  setField: (field: string, value: string | number) => void;
  setErrors: (errors: string[]) => void;
  errors: string[];
  amount: string;
  to: string;
  chain: ChainExtended;
};

export const SendTokens = (props: Props) => {
  const { setField, setErrors, to, errors, chain } = props;
  const { xSignerSelected } = useGetXsignerSelected();
  const { balance } = useGetBalance(xSignerSelected?.address);

  const [tokenBalance, setTokenBalance] = useState<string>(
    balance?.freeBalance ?? ""
  );
  const { amount = "", tokenSymbol = "" } = {
    ...splitTokenAmount(balance?.freeBalance),
  };

  const handleValueChange = (value: string) => {
    setField("amount", `${value} ${tokenSymbol}`);
  };

  useEffect(() => {
    if (!to) {
      setErrors(["Recipient address is required.", ...errors.splice(1)]);
    } else {
      if (!isValidAddress(to)) {
        setErrors(["Invalid address.", ...errors.splice(1)]);
      } else {
        setErrors([...errors.splice(1)]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, setErrors]);

  useEffect(() => {
    if (balance?.freeBalance === tokenBalance) return;

    setTokenBalance(balance?.freeBalance ?? "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance?.freeBalance, setTokenBalance]);
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      width="100%"
      gap={2}
    >
      <TextField
        label={!to ? "Recipient Address *" : "Sending to"}
        defaultValue={to}
        value={to}
        onChange={(e) => setField("to", e.target.value)}
        autoFocus
        fullWidth
        margin="normal"
        error={!!errors[0]}
        helperText={errors[0]}
        InputProps={{
          startAdornment: (
            <Avatar>
              <Identicon value={to} size={32} theme="polkadot" />
            </Avatar>
          ),
        }}
      />
      <Box display="flex" alignItems="center" gap={4}>
        <InputWithMax
          label="Amount *"
          maxValue={amount}
          defaultValue="0"
          onValueChange={handleValueChange}
          error={!!errors[1]}
          helperText={errors[1]}
        />
        <Select
          label=""
          value={tokenBalance}
          defaultChecked
          onChange={(event) => setTokenBalance(event.target.value)}
        >
          <MenuItem value={balance?.freeBalance} selected>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src={chain?.logo.src} alt={chain?.logo.alt} />
              <Box flexDirection="column">
                <Typography variant="body1">{tokenSymbol}</Typography>
                <Typography variant="body2">{balance?.freeBalance}</Typography>
              </Box>
            </Box>
          </MenuItem>
        </Select>
      </Box>
    </Box>
  );
};
