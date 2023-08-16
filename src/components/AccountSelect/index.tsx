import PowerOffIcon from "@mui/icons-material/PowerOff";
import { Avatar, Box, SelectChangeEvent, Stack } from "@mui/material";

import {
  StyledMenuItem,
  StyledSelect,
  StyledTypography,
} from "@/components/AccountSelect/styled";
import { WalletAccount } from "@/services/useink/types";
import { shortNameLonger, truncateAddress } from "@/utils/formatString";

const OPTION_FOR_DISCONNECTING = "disconnect";

export function AccountSelect({
  accounts,
  accountConnected,
  setAccount,
  disconnectWallet,
}: {
  accounts: WalletAccount[] | undefined;
  accountConnected: WalletAccount | undefined;
  setAccount: (account: WalletAccount) => void;
  disconnectWallet: () => void;
}) {
  const _handleChange = (event: SelectChangeEvent<unknown>) => {
    const { address } = event.target.value as { address: string };

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

  const currentAccount = accountConnected?.address;
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
      value={{
        address: accountConnected.address,
        name: accountConnected.name,
      }}
      placeholder="Select Account..."
      onChange={_handleChange}
      renderValue={(value) => {
        const { address, name } = value as { address: string; name: string };
        return (
          <>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  marginTop: "2px",
                  marginLeft: "5px",
                }}
                src={accountConnected?.wallet?.logo.src}
              ></Avatar>
              <Stack>
                <span>{shortNameLonger(name as string)}</span>
                <p>{truncateAddress(address as string)}</p>
              </Stack>
            </Box>
          </>
        );
      }}
    >
      {allAccounts.map((a) => (
        <StyledMenuItem
          key={a.address}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore - necessary to load object into value
          value={{ address: a.address, name: a.name }}
        >
          {a.name !== OPTION_FOR_DISCONNECTING && (
            <>
              <Stack sx={{ display: "flex", flexDirection: "row" }}>
                <Stack>
                  <span>{shortNameLonger(a.name as string)}</span>
                  <p>{truncateAddress(a.address)}</p>
                </Stack>
              </Stack>
            </>
          )}

          {a.name === OPTION_FOR_DISCONNECTING && (
            <>
              <PowerOffIcon sx={{ fontSize: "2rem" }} />
              <Stack>
                <Stack>
                  <StyledTypography>Disconect Wallet</StyledTypography>
                </Stack>
              </Stack>
            </>
          )}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
}
