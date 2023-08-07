import { Box } from "@mui/material";
import { useRouter } from "next/router";

import ErrorMessage from "@/components/common/ErrorMessage";
import { LoadingButton } from "@/components/common/LoadingButton";
import { ROUTES } from "@/config/routes";
import { createArrayOneOrMore } from "@/domain/utilityTsTypes";
import { useAddSignatoriesAccount } from "@/hooks/signatoriesAccount";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
import { ChainId, WalletAccount } from "@/services/useink/types";

interface Props {
  networkId: ChainId;
  accountConnected: WalletAccount;
}

export function NewSignatoriesAccount({ networkId, accountConnected }: Props) {
  const { save, isLoading, error } = useAddSignatoriesAccount();
  const { setXsigner } = useSetXsignerSelected();
  const router = useRouter();

  const createNewAccount = async () => {
    const address = "5CQnnhbG8hSwXkzFXm6C5y8okSX6xMa1kjs2UaCHXc5jUE42";
    const name = "Amazing-Journey0-wallet";
    const secondOwner = "5E4iKX9jcB1sZyBxHV8Xi69ekHF8oWezyG8kc9dC19m6zoso";
    const owners = createArrayOneOrMore([
      accountConnected.address,
      secondOwner,
    ]);
    const threshold = owners.length;

    save(
      { address, name, owners, threshold, networkId },
      {
        onSuccess: (_acc) => {
          setXsigner(_acc);
          router.replace(ROUTES.App);
        },
      }
    );
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          mt: "5rem",
        }}
      >
        <p>Vertical Stepper</p>
        <p>Form To create Wallet</p>
      </Box>

      <LoadingButton isLoading={isLoading} onClick={createNewAccount}>
        Create New Fake account
      </LoadingButton>
    </>
  );
}
