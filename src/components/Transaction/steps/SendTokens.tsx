import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import { useEffect, useState } from "react";

import { getChain } from "@/config/chain";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useGetBalance } from "@/hooks/useGetBalance";
import { isValidAddress, splitTokenAmount } from "@/utils/blockchain";

type Props = {
  setField: (field: string, value: string | number) => void;
  setErrors: (errors: string[]) => void;
  errors: string[];
  amount: string;
  to: string;
};

export const SendTokens = (props: Props) => {
  const { setField, setErrors, to, errors, amount } = props;
  const { accountConnected, network } = usePolkadotContext();

  const { balance } = useGetBalance(accountConnected?.address);
  const [tokenBalance, setTokenBalance] = useState<string>(
    balance?.freeBalance ?? ""
  );
  const chain = getChain(network);
  const formattedAmount = splitTokenAmount(amount)?.amount ?? 0;

  const handleMax = () => {
    setField("amount", balance?.freeBalance ?? "");
  };

  const handleNewAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const token = splitTokenAmount(balance?.freeBalance);
    setField("amount", `${e.target.value} ${token?.tokenSymbol}`);
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
        <TextField
          label="Amount *"
          onChange={handleNewAmount}
          value={formattedAmount}
          margin="normal"
          error={!!errors[1]}
          helperText={errors[1]}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <Button
                onClick={handleMax}
                sx={{ height: "30px" }}
                variant="outlined"
              >
                MAX
              </Button>
            ),
          }}
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
                <Typography variant="body1">
                  {balance?.freeBalance?.split(" ")[1]}
                </Typography>
                <Typography variant="body2">{balance?.freeBalance}</Typography>
              </Box>
            </Box>
          </MenuItem>
        </Select>
      </Box>
    </Box>
  );
};
