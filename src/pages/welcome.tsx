import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { ChainId } from "useink/dist/chains";
import { ArrayOneOrMore } from "useink/dist/core";

import ErrorMessage from "@/components/common/ErrorMessage";
import { BasicLayout } from "@/components/layout/BasicLayout";
import { MainContentCard } from "@/components/layout/shared/MainContentCard";
import NetworkBadge from "@/components/NetworkBadge";
import { AccountSigner } from "@/components/StepperSignersAccount/AccountSigner";
import { ChainExtended, getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Owner } from "@/domain/SignatoriesAccount";
import {
  useAddSignersAccount,
  useDeleteSignersAccount,
  useListSignersAccount,
} from "@/hooks/xsignersAccount";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
import { generateRandomWalletName } from "@/utils/blockchain";
import { customReportError } from "@/utils/error";

type MultisigsDataFormatted = {
  name: string;
  address: string;
  network?: ChainExtended;
};

export default function WelcomePage() {
  const [loading, setLoading] = useState(false);
  const [multisigs, setMultisigs] = useState<MultisigsDataFormatted[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { accountConnected, network } = usePolkadotContext();
  const { logo, name: networkName } = getChain(network);
  const { data: signersAccount } = useListSignersAccount();
  const { save } = useAddSignersAccount();
  const { delete: deleteAccount } = useDeleteSignersAccount();
  const { xsignerOwnersRepository } = useLocalDbContext();
  const { setXsigner } = useSetXsignerSelected();
  const router = useRouter();

  const handleDeletedMultisig = async (multisig: MultisigsDataFormatted) => {
    try {
      deleteAccount({ address: multisig.address });
      setMultisigs((prev) =>
        prev.filter((prevMultisig) => prevMultisig.address !== multisig.address)
      );
    } catch (err) {
      setError(customReportError(err));
    }
  };

  const handleMultisigRedirect = (address: string) => {
    const selectedMultisig = signersAccount?.find(
      (multisig) => multisig.address === address
    );
    if (!selectedMultisig) {
      return;
    }
    setXsigner(selectedMultisig);
    router.replace(ROUTES.App);
  };

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
                  networkId: network as ChainId,
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

  const theme = useTheme();
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
        <Typography variant="h4" color="white">
          The most trusted decentralized multisig platform on Polkadot
          ecosystem.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
            mt: "5rem",
            gap: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography variant="h3" color="white">
              Create a new Multisig
            </Typography>
            <Typography variant="body1" color="white">
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography variant="h3" color="white">
              Import existing Account
            </Typography>
            <Typography variant="body1" color="white">
              Already have a XSigners Account? Add it via its address.
            </Typography>
            <Link href={ROUTES.Load} passHref>
              <Button variant="outlined">
                <AccountBalanceWalletIcon />
                Import existing Account
              </Button>
            </Link>
          </Box>
        </Box>
      </MainContentCard>
      <MainContentCard
        stylesContainer={{
          alignItems: "center",
          sx: {
            margin: { xs: 1, sm: 2, md: 2, lg: 3, xl: 3 },
          },
        }}
      >
        <Typography variant="h3" color="white">
          My XSigners accounts ({multisigs.length})
        </Typography>
        <Box
          mt={3}
          width="100%"
          sx={{ backgroundColor: theme.palette.background.paper }}
          p={0}
          pt={0}
          pb={0}
        >
          {!loading ? (
            multisigs.map((multisig) => (
              <>
                <Box
                  onClick={() => handleMultisigRedirect(multisig.address)}
                  key={multisig.address}
                  display="flex"
                  gap={8}
                  alignItems="center"
                  justifyContent="space-around"
                  sx={{
                    borderBottom: "1px solid #2F2F2F",
                    borderTop: "1px solid #2F2F2F",
                    "&:hover": { backgroundColor: "#2F2F2F" },
                  }}
                  p={1}
                  pl={0}
                >
                  <Box width={300}>
                    <AccountSigner
                      name={multisig.name}
                      address={multisig.address}
                      truncateAmount={16}
                      showLink={false}
                    />
                  </Box>
                  <Box>
                    <NetworkBadge
                      showTooltip={false}
                      name={multisig.network?.name || networkName}
                      logo={multisig.network?.logo?.src || logo.src}
                      logoSize={{ width: 20, height: 20 }}
                      description={multisig.network?.logo?.alt || logo.alt}
                    />
                  </Box>
                  <Box>
                    <DeleteOutlinedIcon
                      onClick={() => handleDeletedMultisig(multisig)}
                      sx={{ cursor: "pointer" }}
                    />
                  </Box>
                </Box>
              </>
            ))
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
            >
              <CircularProgress size={50} />
            </Box>
          )}
        </Box>
      </MainContentCard>
    </Box>
  );
}

WelcomePage.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;
WelcomePage.walletRequired = false;
