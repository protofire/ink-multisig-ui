import PowerOffIcon from "@mui/icons-material/PowerOff";
import {
  MenuItem,
  MenuItemProps,
  Select,
  SelectChangeEvent,
  SelectProps,
  Stack,
  styled,
} from "@mui/material";

import { WalletAccount } from "@/services/useink/types";
import { shortNameLonger, truncateAddress } from "@/utils/formatString";

import { AvatarAccount } from "./AvatarAccount";

const OPTION_FOR_DISCONNECTING = "disconnect";

const StyledSelect = styled(Select)<SelectProps>(() => ({
  color: "white",
  display: "flex",
  margin: "0.5rem 0",
  padding: "0",
  height: "2.88em",
  borderRadius: "0.5rem",

  "& fieldset": {
    top: "0",
  },

  "& span": {
    fontSize: "0.8rem",
    marginLeft: "1rem",
  },

  "& p": {
    fontSize: "0.8rem",
    marginLeft: "1rem",
    fontWeight: "600",
    lineHeight: "12px",
  },

  "& legend": {
    display: "none",
  },
}));

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(() => ({
  color: "white",

  "& span": {
    fontSize: "0.8rem",
    marginLeft: "1rem",
  },

  "& p": {
    fontSize: "0.8rem",
    marginLeft: "1rem",
    fontWeight: "600",
    lineHeight: "12px",
  },
}));

export function AccountSelect({
  accounts,
  currentAccount,
  setAccount,
  disconnectWallet,
}: {
  accounts: WalletAccount[] | undefined;
  currentAccount: string | undefined;
  setAccount: (account: WalletAccount) => void;
  disconnectWallet: () => void;
}) {
  const _handleChange = (event: SelectChangeEvent<unknown>) => {
    const address = event.target.value;
    if (address === OPTION_FOR_DISCONNECTING) {
      disconnectWallet();
      return;
    }
    const newAccount = accounts?.find((element) => element.address === address);
    if (!newAccount) {
      console.error(
        `Theres not an account with this address ${event.target.value}`
      );
      return;
    }
    setAccount(newAccount);
  };
  if (!accounts)
    return (
      <StyledSelect
        value={"Select Account..."}
        placeholder="Select Account..."
      ></StyledSelect>
    );

  if (!currentAccount)
    return (
      <StyledSelect
        value={"No Account"}
        placeholder="No account"
      ></StyledSelect>
    );

  const allAccounts = [
    ...accounts,
    { name: OPTION_FOR_DISCONNECTING, address: OPTION_FOR_DISCONNECTING },
  ];

  return (
    <StyledSelect
      value={currentAccount}
      placeholder="Select Account..."
      onChange={_handleChange}
    >
      {allAccounts.map((a) => (
        <StyledMenuItem
          sx={{
            color: "white",
          }}
          selected={currentAccount === a.address}
          key={a.address}
          value={a.address}
        >
          {a.name !== OPTION_FOR_DISCONNECTING && (
            <Stack sx={{ display: "flex", flexDirection: "row" }}>
              <AvatarAccount address={a.address} />
              <Stack>
                <span>{shortNameLonger(a.name as string)}</span>
                <p>{truncateAddress(a.address)}</p>
              </Stack>
            </Stack>
          )}

          {a.name === OPTION_FOR_DISCONNECTING && (
            <>
              <PowerOffIcon sx={{ fontSize: "2rem" }} />
              <Stack
                sx={{
                  height: "20px",
                  justifyContent: "center",
                  margin: "10px 13px",
                }}
              >
                <Stack>
                  <p
                    style={{
                      marginLeft: "0px",
                      height: "10px",
                      fontSize: "1rem",
                    }}
                  >
                    Disconect Wallet
                  </p>
                </Stack>
              </Stack>
            </>
          )}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
}
