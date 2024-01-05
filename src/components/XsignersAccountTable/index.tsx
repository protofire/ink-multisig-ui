import { HowToReg } from "@mui/icons-material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Box, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import router from "next/router";
import { ChainId } from "useink/dist/chains";

import NetworkBadge from "@/components/NetworkBadge";
import { AccountSigner } from "@/components/StepperSignersAccount/AccountSigner";
import { getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { formatThreshold } from "@/utils/formatString";

interface Props {
  multisigs: Array<SignatoriesAccount> | null;
  onClick: (account: SignatoriesAccount) => Promise<void | SignatoriesAccount>;
  network: ChainId;
  accountConnected: string | undefined;
}

export function XsignersAccountTable({
  multisigs,
  onClick: setXsigner,
  network,
  accountConnected,
}: Props) {
  const { logo, name: networkName } = getChain(network);
  const theme = useTheme();
  const { signatoriesAccountRepository } = useLocalDbContext();

  const handleMultisigRedirect = async (address: string) => {
    const selectedMultisig = multisigs?.find(
      (multisig) => multisig.address === address
    );

    if (!selectedMultisig) {
      return;
    }
    const savedMultisig =
      await signatoriesAccountRepository.getSignatoryAccount(
        selectedMultisig.networkId,
        selectedMultisig.address
      );
    const updatedMultisigWithOwners = {
      ...selectedMultisig,
      owners: selectedMultisig.owners.map((owner) => {
        const savedOwner = savedMultisig?.owners.find(
          (savedOwner) => savedOwner.address === owner.address
        );
        return {
          ...owner,
          name: savedOwner?.name || owner.name,
        };
      }),
    };
    await setXsigner(updatedMultisigWithOwners as SignatoriesAccount);
    router.replace(ROUTES.App);
  };

  if (multisigs === null || !accountConnected) return null;

  return (
    <Box
      sx={{
        margin: { xs: 1, sm: 2, md: 3, lg: 4, xl: 10 },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Typography variant="h3" color="white">
          My XSigners accounts ({multisigs.length})
        </Typography>
        <Typography variant="body1" component="p">
          on
        </Typography>
        <NetworkBadge
          showTooltip={false}
          name={networkName}
          logo={logo.src}
          logoSize={{ width: 20, height: 20 }}
          description={logo.alt}
        />
      </Box>
      <Box
        mt={3}
        width="100%"
        sx={{ backgroundColor: theme.palette.background.paper }}
        p={0}
        pt={0}
        pb={0}
      >
        {multisigs.map((multisig) => (
          <Box key={multisig.address}>
            <Box
              onClick={() => handleMultisigRedirect(multisig.address)}
              display="flex"
              gap={8}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderBottom: "1px solid #2F2F2F",
                borderTop: "1px solid #2F2F2F",
                "&:hover": { backgroundColor: "#2F2F2F" },
              }}
              p={1}
              pl={2}
              pr={4}
            >
              <Box width={300}>
                <AccountSigner
                  name={multisig.name}
                  address={multisig.address}
                  truncateAmount={16}
                  showLink={false}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <HowToReg
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.primary.main,
                  }}
                />
                <Tooltip title="You are the owner of this account." arrow>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{
                      fontSize: "0.8rem",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Owner
                  </Typography>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title="Threshold" arrow>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: "0.8rem", color: "#aaaaaa" }}
                  >
                    {formatThreshold({
                      threshold: multisig.threshold,
                      owners: multisig.owners.length,
                    })}
                  </Typography>
                </Tooltip>
              </Box>
              <Box>
                <ArrowForwardIosRoundedIcon
                  sx={{ fontSize: "1.2rem", color: "#4d4d4d" }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
