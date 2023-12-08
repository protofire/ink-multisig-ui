import { Box, Typography } from "@mui/material";

import { ConnectWalletSection } from "@/components/ConnectWalletSection";
import { TxBuilderStepper } from "@/components/TxBuilderStepper";
import { usePolkadotContext } from "@/context/usePolkadotContext";

export default function TxBuilderPage() {
  const { accountConnected } = usePolkadotContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Typography mb={4} variant="h3" color="primary">
        Transaction builder
      </Typography>

      {accountConnected ? (
        <TxBuilderStepper />
      ) : (
        <ConnectWalletSection
          text={
            "You need to connect a wallet to interact with an external contract."
          }
        />
      )}
    </Box>
  );
}
