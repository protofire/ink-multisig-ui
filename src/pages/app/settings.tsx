import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { AbiMessage, ContractPromise } from "useink/dist/core";

import { useAppNotificationContext } from "@/components/AppToastNotification/AppNotificationsContext";
import { OWNER_STEPS, THRESHOLD_STEPS } from "@/components/Settings/constants";
import ManageOwners from "@/components/Settings/ManageOwners";
import RequiredConfirmations from "@/components/Settings/RequiredConfirmations";
import { AccountSigner } from "@/components/StepperSignersAccount/AccountSigner";
import BaseStepper from "@/components/StepperSignersAccount/BaseStepper";
import { StepProps } from "@/components/StepperSignersAccount/constants";
import { useManagerActiveStep } from "@/components/StepperSignersAccount/useManagerActiveStep";
import { useContractTx } from "@/components/TxBuilderStepper/ProposeTxStep/useContractTx";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { Owner, SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useDryRunExecution } from "@/hooks/useDryRunExecution";
import { useFormSignersAccountState } from "@/hooks/xsignersAccount/useFormSignersAccountState";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
import { transformArgsToBytes } from "@/utils/blockchain";

export default function SettingsPage() {
  const { xSignerSelected } = useGetXsignerSelected();
  const { multisigContractPromise } = useMultisigContractPromise(
    xSignerSelected?.address
  );
  const { xsignerOwnersRepository } = useLocalDbContext();
  const { version: contractVersion } = (multisigContractPromise?.contract.abi
    .json?.contract as {
    version: string;
  }) ?? { version: "unknown" };

  const [params, setParams] = useState<unknown[]>([]);
  const [methodName, setMethodName] = useState<AbiMessage | undefined>();
  const { error, outcome, executeDryRun } = useDryRunExecution({
    contractPromise: multisigContractPromise?.contract as ContractPromise,
    message: methodName,
    params,
    addressCaller: xSignerSelected?.address,
  });

  const theme = useTheme();
  const [steps, setSteps] = useState<StepProps | null>();
  const [selectedMultisig, setSelectedMultisig] = useState<
    SignatoriesAccount | null | undefined
  >(xSignerSelected);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addNotification } = useAppNotificationContext();
  const data = useFormSignersAccountState();
  const managerStep = useManagerActiveStep();
  const { setXsigner } = useSetXsignerSelected();
  const dryRunExecuted = useRef(false);

  const handleTxCompleted = () => {
    setParams([]);
    setMethodName(undefined);
    const updatedMultisig = {
      ...selectedMultisig,
      owners: data.owners,
      threshold: data.threshold,
    } as SignatoriesAccount;
    setTimeout(() => {
      setIsLoading(false);
      addNotification({
        message: "Transaction executed successfully",
        type: "success",
      });
      handleCancel();
      fetchData(updatedMultisig);
    }, 2000);
  };

  const { signAndSend, error: txError } = useContractTx({
    contractPromise: multisigContractPromise?.contract as ContractPromise,
    abiMessage: multisigContractPromise?.contract.abi.findMessage("proposeTx"),
    onTxMined: handleTxCompleted,
  });

  useEffect(() => {
    if (params.length) {
      executeDryRun();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.length]);

  useEffect(() => {
    if (error && dryRunExecuted.current) {
      addNotification({ message: error, type: "error" });
      setIsLoading(false);
      setParams([]);
      setMethodName(undefined);
      return;
    }

    if (outcome && !error) {
      const txTransferStruct = prepareTransactionData();
      dryRunExecuted.current = false;
      signAndSend([txTransferStruct]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNotification, error, outcome]);

  useEffect(() => {
    if (txError) {
      setIsLoading(false);
      setParams([]);
      setMethodName(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txError]);

  const fetchData = async (updatedMultisig?: SignatoriesAccount) => {
    const currentMultisig = updatedMultisig ?? xSignerSelected;
    if (!currentMultisig?.address) return;

    try {
      const result = await xsignerOwnersRepository.getMultisigByAddress(
        currentMultisig.address
      );

      if (result) {
        const existingOwners = currentMultisig.owners || [];
        let nextIndex = existingOwners.length;

        const updatedOwners = result.owners.map((address) => {
          const existingOwner = existingOwners.find(
            (owner) => owner.address === address
          );

          if (existingOwner) {
            return existingOwner;
          } else {
            nextIndex++;
            return { address, name: `Signer ${nextIndex}` };
          }
        });

        const multisig = {
          ...currentMultisig,
          owners: updatedOwners,
          threshold: result.threshold,
        } as SignatoriesAccount;

        setSelectedMultisig(multisig);
        data.handleOwners(multisig.owners, 0);
        data.handleThreshold(result.threshold, multisig.owners.length);
        await setXsigner(multisig);
      } else {
        setSelectedMultisig(currentMultisig);
      }
    } catch {
      setSelectedMultisig(currentMultisig);
    }
  };

  const handleBack = () => {
    if (!selectedMultisig) return;
    data.handleOwners(selectedMultisig.owners, 0);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xSignerSelected?.address]);

  const handleAddOwner = () => {
    setSteps(OWNER_STEPS);
  };

  const handleAddThreshold = () => {
    setSteps(THRESHOLD_STEPS);
  };

  const handleCancel = () => {
    setSteps(null);
    managerStep.resetSteps();
    if (selectedMultisig) {
      data.handleOwners(selectedMultisig.owners, 0);
      data.handleThreshold(selectedMultisig.threshold);
    }
  };

  const setupTransaction = (
    transactionType: string,
    transactionData: unknown
  ) => {
    setIsLoading(true);
    setMethodName(
      multisigContractPromise?.contract.abi.findMessage(transactionType)
    );
    dryRunExecuted.current = true;
    setParams([transactionData]);
  };

  const handleConfirm = async () => {
    const transactionType =
      steps === OWNER_STEPS ? "addOwner" : "changeThreshold";
    const transactionData = {
      addOwner: data.owners.slice(-1)[0].address,
      changeThreshold: data.threshold,
    };

    setupTransaction(transactionType, transactionData[transactionType]);
  };

  const handleDeleteOwner = async (owner: Owner) => {
    const transactionType = "removeOwner";
    const transactionData = {
      removeOwner: owner.address,
    };

    setupTransaction(transactionType, transactionData[transactionType]);
  };

  function prepareTransactionData() {
    const input = transformArgsToBytes(
      multisigContractPromise?.contract as ContractPromise,
      methodName?.method as string,
      params
    );
    return {
      address: xSignerSelected?.address,
      selector: methodName?.selector,
      input: Array.from(input),
      transferredValue: 0,
      gasLimit: 0,
      allowReentry: true,
    };
  }

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
        {steps && <CancelOutlinedIcon onClick={handleCancel} color="primary" />}
      </Box>

      {steps ? (
        <BaseStepper
          isExecuting={false}
          steps={steps}
          data={data}
          onCompleteCreation={console.log}
          managerStep={managerStep}
          customInitialRedirect={handleCancel}
          customFinalRedirect={handleConfirm}
          isConfirmLoading={isLoading}
          onHandleBack={handleBack}
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
                name={selectedMultisig?.name as string}
                address={selectedMultisig?.address as string}
                truncateAmount={16}
              />
            </Box>
            <Box>
              <Typography>Contract version: {contractVersion}</Typography>
            </Box>
          </Box>
          <Box mt={2} bgcolor={theme.palette.grey.A100} p={3}>
            <ManageOwners
              selectedMultisig={selectedMultisig ?? undefined}
              owners={selectedMultisig?.owners}
              handleAddOwner={handleAddOwner}
              isDeletedLoading={isLoading}
              handleDeleteOwner={handleDeleteOwner}
            />
          </Box>
          <Box mt={4} bgcolor={theme.palette.grey.A100} p={3}>
            <RequiredConfirmations
              owners={selectedMultisig?.owners}
              threshold={selectedMultisig?.threshold}
              handleAddThreshold={handleAddThreshold}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
