import { Box } from "@mui/material";
import { useRouter } from "next/router";

import { ROUTES } from "@/config/routes";
import { createArrayOneOrMore } from "@/domain/utilityTsTypes";
import { useAddSignatoriesAccount } from "@/hooks/signatoriesAccount";
import { ChainId, WalletAccount } from "@/services/useink/types";

import ErrorMessage from "../common/ErrorMessage";
import LoadingButton from "../common/LoadingButton";

interface Props {
  networkId: ChainId;
  accountConnected: WalletAccount;
}

export function NewSignatoriesAccount({ networkId, accountConnected }: Props) {
  const { save, isLoading, error } = useAddSignatoriesAccount();
  const router = useRouter();

  const createNewAccount = async () => {
    const address = "5CQnnhbG8hSwXkzFXm6C5y8okSX6xMa1kjs2UaCHXc5jUE42";
    const secondOwner = "5E4iKX9jcB1sZyBxHV8Xi69ekHF8oWezyG8kc9dC19m6zoso";
    const owners = createArrayOneOrMore([
      accountConnected.address,
      secondOwner,
    ]);
    const threshold = owners.length;

    save({ address, owners, threshold, networkId }).then(() =>
      router.replace(ROUTES.App)
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
