import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { ArrayOneOrMore } from "useink/dist/core";

import ErrorMessage from "@/components/common/ErrorMessage";
import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import {
  MultisigsDataFormatted,
  XsignersAccountTable,
} from "@/components/XsignersAccountTable";
import { getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Owner } from "@/domain/SignatoriesAccount";
import {
  useAddSignersAccount,
  useListSignersAccount,
} from "@/hooks/xsignersAccount";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
import { generateRandomWalletName } from "@/utils/blockchain";
import { customReportError } from "@/utils/error";

export default function WelcomePage() {
  const [loading, setLoading] = useState(false);
  const [multisigs, setMultisigs] = useState<MultisigsDataFormatted[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { accountConnected, network } = usePolkadotContext();
  const { data: signersAccount } = useListSignersAccount();
  const { save } = useAddSignersAccount();
  const { xsignerOwnersRepository } = useLocalDbContext();
  const { setXsigner } = useSetXsignerSelected();
  const theme = useTheme();

  useEffect(() => {
    setError(null);

    const fetchData = async () => {
      try {
        setLoading(true);

        const alreadyExistsMultisigs =
          signersAccount?.map((acc) => ({
            address: acc.address,
            name: acc.name,
            network: getChain(acc.networkId),
            networkId: acc.networkId,
          })) || [];
        let allMultisigs: MultisigsDataFormatted[] = alreadyExistsMultisigs;

        if (accountConnected?.address) {
          const result = await xsignerOwnersRepository.getMultisigsByOwner(
            accountConnected.address
          );
          if (result) {
            const filteredMultisigs = result.filter(
              (multisig) =>
                !alreadyExistsMultisigs
                  .map((acc) => acc.address)
                  .includes(multisig.addressSS58)
            );

            const savePromises = filteredMultisigs.map((multisig) =>
              save({
                account: {
                  address: multisig.addressSS58,
                  name: generateRandomWalletName(),
                  networkId: network,
                  owners: multisig.owners.map((owner, index) => ({
                    address: owner,
                    name: `Signer ${index + 1}`,
                  })) as ArrayOneOrMore<Owner>,
                  threshold: multisig.threshold,
                },
              })
            );

            await Promise.all(savePromises);

            allMultisigs = [
              ...allMultisigs,
              ...filteredMultisigs.map((multisig) => ({
                address: multisig.addressSS58,
                name: generateRandomWalletName(),
                networkId: network,
              })),
            ];
          }
        }

        setMultisigs(allMultisigs);
      } catch (err) {
        setError(customReportError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountConnected?.address, network, save, signersAccount?.length]);

  return (
    <Box>
      {error && <ErrorMessage message={error} />}
      <MainContentCard
        stylesContainer={{
          alignItems: "center",
          sx: {
            backgroundColor: theme.palette.background.paper,
            margin: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3 },
            padding: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3 },
          },
        }}
      >
        <Typography variant="h1" color="white">
          Welcome to XSigners
        </Typography>
        <Typography variant="h5" color="grey">
          The most trusted decentralized multisig platform on Polkadot
          ecosystem.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
            mt: "4rem",
            gap: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h3" color="white">
              Create a new Multisig
            </Typography>
            <Typography variant="body1" color="grey">
              A new Account that is controlled by one or multiple owners.
            </Typography>
            <Link href={ROUTES.New} passHref>
              <Button
                variant="contained"
                sx={{ color: theme.palette.common.black }}
              >
                <AddCircleIcon />
                Create new Account
              </Button>
            </Link>
          </Box>
        </Box>
      </MainContentCard>
      {!loading ? (
        <XsignersAccountTable
          network={network}
          onClick={setXsigner}
          multisigs={multisigs}
        />
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" p={2}>
          <CircularProgress size={50} />
        </Box>
      )}
    </Box>
  );
}

WelcomePage.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;
WelcomePage.walletRequired = false;
