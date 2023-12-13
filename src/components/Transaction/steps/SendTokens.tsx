import {
  Avatar,
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import { useCallback, useEffect, useState } from "react";

import { ChainExtended, getChain } from "@/config/chain";
import useFetchAssets, { Asset } from "@/hooks/assets/useFetchAssets";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { isValidAddress, splitTokenAmount } from "@/utils/blockchain";
import { balanceToFixed } from "@/utils/formatString";

import InputWithMax from "../inputs/InputWithMax";

type Props = {
  setField: (field: string, value: string | number) => void;
  setErrors: (errors: string[]) => void;
  errors: string[];
  amount: string;
  to: string;
  token: string;
  chain: ChainExtended;
};

export const SendTokens = (props: Props) => {
  const { setField, setErrors, to, errors, chain, token } = props;
  const { xSignerSelected } = useGetXsignerSelected();
  const { balance } = useGetBalance(xSignerSelected?.address);
  const { listAssetByType } = useFetchAssets("");
  const assets = listAssetByType("token");
  const customToken = getChain();
  const { amount, tokenSymbol = "" } = {
    ...splitTokenAmount(balance?.freeBalance),
  };

  const [tokenSelected, setTokenSelected] = useState<{
    symbol: string;
    isNative: boolean;
    address?: string;
  }>({ symbol: tokenSymbol, isNative: true, address: "native" });
  const [maxAmount, setMaxAmount] = useState<string | undefined>(amount);
  const [inputValue, setInputValue] = useState<string>("0");

  const formatBalance = useCallback((asset: Asset) => {
    if (asset) {
      return balanceToFixed(asset.balance, asset.decimals);
    }
    return "";
  }, []);

  useEffect(() => {
    if (tokenSelected.isNative) {
      setMaxAmount(amount);
    } else {
      const asset = assets.find(
        (asset) => asset.address === tokenSelected.address
      );
      const formattedBalance = (
        Number(asset?.balance) /
        10 ** asset?.decimals
      ).toFixed(2);
      setMaxAmount(formattedBalance);
    }
  }, [amount, assets, tokenSelected]);

  useEffect(() => {
    const asset = assets.find((asset) => asset.address === token);
    if (asset) {
      setTokenSelected({
        symbol: asset.name,
        isNative: false,
        address: asset.address,
      });
    }
  }, [assets, token]);

  const handleValueChange = useCallback(
    (value: string) => {
      setField(
        "amount",
        `${value} ${
          tokenSelected.isNative ? tokenSymbol : tokenSelected?.symbol
        }`
      );
      if (!tokenSelected.isNative) {
        setField("token", tokenSelected.address ?? "");
      }
      setInputValue(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setField, tokenSelected.isNative, tokenSelected?.symbol, tokenSymbol]
  );

  useEffect(() => {
    if (!to) {
      setErrors(["Recipient address is required.", ...errors.splice(1)]);
    } else if (!isValidAddress(to)) {
      setErrors(["Invalid address.", ...errors.splice(1)]);
    } else {
      setErrors([...errors.splice(1)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, setErrors]);

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
          value={inputValue}
          maxValue={maxAmount || ""}
          defaultValue="0"
          onValueChange={handleValueChange}
          error={!!errors[1]}
          helperText={errors[1]}
        />
        <Select
          label=""
          value={tokenSelected.address}
          onChange={(event) => {
            const selectedAsset = assets.find(
              (asset) => asset.address === event.target.value
            );
            setInputValue("0");
            if (selectedAsset) {
              setTokenSelected({
                symbol: selectedAsset.name,
                isNative: false,
                address: selectedAsset.address,
              });
            }
          }}
        >
          <MenuItem
            value="native"
            onClick={() =>
              setTokenSelected({
                symbol: tokenSymbol,
                isNative: true,
                address: "native",
              })
            }
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src={chain?.logo.src} alt={chain?.logo.alt} />
              <Box flexDirection="column">
                <Typography variant="body1">{tokenSymbol}</Typography>
                <Typography variant="body2">{balance?.freeBalance}</Typography>
              </Box>
            </Box>
          </MenuItem>
          {assets.map((asset) => (
            <MenuItem key={asset.address} value={asset.address}>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  src={customToken?.logo.src}
                  alt={customToken?.logo.alt}
                />
                <Box flexDirection="column">
                  <Typography variant="body1">{asset.name}</Typography>
                  <Typography variant="body2">
                    {formatBalance(asset)}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
