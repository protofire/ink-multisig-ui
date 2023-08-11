import { Box, Button } from "@mui/material";
import { useAllWallets, useWallet } from "useink";

export const WalletConnect = () => {
  const wallets = useAllWallets();
  const { isConnected, connect, disconnect } = useWallet();

  if (isConnected) {
    return (
      <Button color="secondary" onClick={disconnect}>
        Disconnect
      </Button>
    );
  }

  return (
    <Box display="flex" flexDirection="row" gap={2}>
      {wallets
        .filter((wallet) => wallet.installed)
        .map((wallet) => (
          <Button
            key={wallet.title}
            color="secondary"
            onClick={() => connect(wallet.extensionName)}
          >
            {/* <Image src={wallet.logo.src} alt={wallet.logo.alt} /> */}
            Connect to {wallet.title}
          </Button>
        ))}
    </Box>
  );
};
