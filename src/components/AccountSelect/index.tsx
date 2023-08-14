import PowerOffIcon from "@mui/icons-material/PowerOff";
import { Avatar, SelectChangeEvent, Stack } from "@mui/material";

import {
  StyledMenuItem,
  StyledSelect,
  StyledTypography,
} from "@/components/AccountSelect/styled";
import { WalletAccount } from "@/services/useink/types";
import { shortNameLonger, truncateAddress } from "@/utils/formatString";

import { AvatarAccount } from "../ModalWalletProvider/AvatarAccount";

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
      value={currentAccount}
      placeholder="Select Account..."
      onChange={_handleChange}
    >
      {allAccounts.map((a) => (
        <StyledMenuItem
          selected={currentAccount === a.address}
          key={a.address}
          value={a.address}
        >
          {a.name !== OPTION_FOR_DISCONNECTING && (
            <>
              <Stack sx={{ display: "flex", flexDirection: "row" }}>
                {currentAccount === a.address ? (
                  <>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        marginTop: "1px",
                        marginLeft: "5px",
                      }}
                      src={accountConnected?.wallet?.logo.src}
                    ></Avatar>
                  </>
                ) : (
                  <AvatarAccount address={a.address} />
                )}
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
