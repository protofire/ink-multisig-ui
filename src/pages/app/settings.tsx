import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import { OWNER_STEPS } from "@/components/Settings/constants";
import ManageOwners from "@/components/Settings/ManageOwners";
import RequiredConfirmations from "@/components/Settings/RequiredConfirmations";
import { AccountSigner } from "@/components/StepperSignersAccount/AccountSigner";
import BaseStepper from "@/components/StepperSignersAccount/BaseStepper";
import { StepProps } from "@/components/StepperSignersAccount/constants";
import { useManagerActiveStep } from "@/components/StepperSignersAccount/useManagerActiveStep";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useFormSignersAccountState } from "@/hooks/xsignersAccount/useFormSignersAccountState";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

export default function SettingsPage() {
  const { xSignerSelected } = useGetXsignerSelected();
  const { multisigContractPromise } = useMultisigContractPromise(
    xSignerSelected?.address
  );
  const { version: contractVersion } = (multisigContractPromise?.contract.abi
    .json?.contract as {
    version: string;
  }) ?? { version: "unknown" };

  const theme = useTheme();
  const [steps, setSteps] = useState<StepProps | null>();
  const data = useFormSignersAccountState();
  const managerStep = useManagerActiveStep();

  const handleAddOwner = () => {
    setSteps(OWNER_STEPS);
  };

  const renderTitle = () => {
    const title = steps ? "New transaction" : "Settings";
    const color = steps ? undefined : "primary";
    const variant = steps ? "h4" : "h3";
    return (
      <Typography variant={variant} color={color}>
        {title}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        margin: "4rem",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        {renderTitle()}
        {steps && (
          <CancelOutlinedIcon onClick={() => setSteps(null)} color="primary" />
        )}
      </Box>

      {steps ? (
        <BaseStepper
          isExecuting={false}
          steps={steps}
          data={data}
          onCompleteCreation={console.log}
          managerStep={managerStep}
        />
      ) : (
        <>
          <Box
            display="flex"
            flex={1}
            width="100%"
            mt={2}
            alignItems="center"
            justifyContent="space-between"
            bgcolor={theme.palette.grey.A100}
            p={3}
          >
            <Box>
              <AccountSigner
                name={xSignerSelected?.name as string}
                address={xSignerSelected?.address as string}
                truncateAmount={16}
              />
            </Box>
            <Box>
              <Typography>Contract version: {contractVersion}</Typography>
            </Box>
          </Box>
          <Box mt={2} bgcolor={theme.palette.grey.A100} p={3}>
            <ManageOwners
              selectedMultisig={xSignerSelected ?? undefined}
              owners={xSignerSelected?.owners}
              handleAddOwner={handleAddOwner}
            />
          </Box>
          <Box mt={4} bgcolor={theme.palette.grey.A100} p={3}>
            <RequiredConfirmations
              owners={xSignerSelected?.owners}
              threshold={xSignerSelected?.threshold}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
