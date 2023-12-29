import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  decodeCallResult,
  toRegistryErrorDecoded,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
} from "useink/core";
import { ContractPromise, WeightV2 } from "useink/dist/core";

import { useAppNotificationContext } from "@/components/AppToastNotification/AppNotificationsContext";
import { OWNER_STEPS, THRESHOLD_STEPS } from "@/components/Settings/constants";
import ManageOwners from "@/components/Settings/ManageOwners";
import RequiredConfirmations from "@/components/Settings/RequiredConfirmations";
import { AccountSigner } from "@/components/StepperSignersAccount/AccountSigner";
import BaseStepper from "@/components/StepperSignersAccount/BaseStepper";
import { StepProps } from "@/components/StepperSignersAccount/constants";
import { useManagerActiveStep } from "@/components/StepperSignersAccount/useManagerActiveStep";
import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Owner, SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useMultisigContractPromise } from "@/hooks/contractPromise/useMultisigContractPromise";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { useNetworkApi } from "@/hooks/useNetworkApi";
import { useFormSignersAccountState } from "@/hooks/xsignersAccount/useFormSignersAccountState";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";
import { getMessageInfo } from "@/utils/blockchain";
import { MAX_CALL_WEIGHT, PROOFSIZE } from "@/utils/bn";
import { customReportError } from "@/utils/error";

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

  const dryRun = useGetDryRun(multisigContractPromise?.contract, "proposeTx");
  const api = useNetworkApi();
  const { accountConnected } = usePolkadotContext();
  const theme = useTheme();
  const [steps, setSteps] = useState<StepProps | null>();
  const [selectedMultisig, setSelectedMultisig] =
    useState<SignatoriesAccount | null>(xSignerSelected);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addNotification } = useAppNotificationContext();
  const data = useFormSignersAccountState();
  const managerStep = useManagerActiveStep();
  const { setXsigner } = useSetXsignerSelected();

  useEffect(() => {
    const fetchData = async () => {
      if (!xSignerSelected?.address) return;
      try {
        const result = await xsignerOwnersRepository.getMultisigByAddress(
          xSignerSelected.address as string
        );
        if (result) {
          const newOwners = result.owners
            .filter((address) => {
              return !xSignerSelected.owners?.find(
                (owner) => owner.address === address
              );
            })
            ?.map((address, index) => {
              return {
                address: address,
                name: `Signer ${
                  (xSignerSelected.owners?.length ?? 0) + index + 1
                }`,
              };
            });
          const owners =
            newOwners.length > 0
              ? xSignerSelected.owners?.length > 0
                ? [...xSignerSelected.owners, ...newOwners]
                : newOwners
              : xSignerSelected.owners || [];
          const multisig = {
            ...xSignerSelected,
            owners,
            threshold: result.threshold,
          } as SignatoriesAccount;
          setSelectedMultisig(multisig);
          data.handleOwners(multisig.owners, 0);
          await setXsigner(multisig);
        } else {
          setSelectedMultisig(xSignerSelected);
        }
      } catch {
        setSelectedMultisig(xSignerSelected);
      }
    };

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

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      const parsedData = {
        addOwner: data.owners.slice(-1)[0].address,
        changeThreshold: data.threshold,
      };
      const transactionType =
        steps === OWNER_STEPS ? "addOwner" : "changeThreshold";
      const transactionData = await prepareTransactionData(
        transactionType,
        parsedData
      );

      if (!transactionData) return;

      const dryRunResult = await performDryRun(transactionData);
      if (!dryRunResult?.ok) {
        throw new Error(
          dryRunResult?.error.toString() ??
            "Error on executing the transaction."
        );
      }

      const gasRequired = dryRunResult.value.gasRequired as WeightV2;
      await executeTransaction(
        gasRequired,
        transactionData,
        "Transaction sent successfully. You can check it on Transactions queue."
      );
    } catch (e) {
      const errorFormatted = customReportError(e);
      addNotification({ message: errorFormatted, type: "error" });
      setIsLoading(false);
    }
  };

  const handleDeleteOwner = async (owner: Owner) => {
    try {
      setIsLoading(true);
      const parsedData = {
        removeOwner: owner.address,
      };
      const transactionType = "removeOwner";
      const transactionData = await prepareTransactionData(
        transactionType,
        parsedData
      );

      if (!transactionData) return;

      const dryRunResult = await performDryRun(transactionData);
      if (!dryRunResult?.ok) {
        throw new Error(
          dryRunResult?.error.toString() ??
            "Error on executing the transaction."
        );
      }

      const gasRequired = dryRunResult.value.gasRequired as WeightV2;
      await executeTransaction(
        gasRequired,
        transactionData,
        "Transaction sent successfully. You can check it on Transactions queue."
      );
    } catch (e) {
      const errorFormatted = customReportError(e);
      addNotification({ message: errorFormatted, type: "error" });
      setIsLoading(false);
    }
  };

  async function prepareTransactionData(
    type: string,
    data: { [key: string]: string | number }
  ) {
    const contract = multisigContractPromise?.contract;
    const txData = contract?.tx[type];
    const selector = txData?.meta.selector;
    const input = api.apiPromise
      ?.createType(
        type === "addOwner" || type === "removeOwner" ? "AccountId" : "u8",
        data[type]
      )
      .toU8a();
    const abiMessage = getMessageInfo(contract as ContractPromise, type);
    if (!input) return null;

    const inputArray = new Uint8Array(input.length);
    inputArray.set(input, 0);
    const dryRunData = await contract?.query[type](
      xSignerSelected?.address as string,
      {
        gasLimit: api.apiPromise?.registry.createType("WeightV2", {
          refTime: MAX_CALL_WEIGHT,
          proofSize: PROOFSIZE,
        }) as WeightV2,
      },
      data[type]
    );
    const err = toRegistryErrorDecoded(
      api.apiPromise?.registry,
      dryRunData?.result
    );
    const decodedData = decodeCallResult(
      dryRunData?.result,
      abiMessage,
      contract?.abi.registry
    );

    if (err) {
      throw new Error(err.docs.join("\n"));
    }

    if (decodedData?.value.Err) {
      throw new Error(`Error: ${decodedData?.value.Err}`);
    }
    return {
      address: xSignerSelected?.address,
      selector: selector,
      input: Array.from(inputArray),
      transferredValue: 0,
      gasLimit: 0,
      allowReentry: true,
    };
  }

  async function performDryRun(transactionData: any) {
    return await dryRun.send([transactionData]);
  }

  async function executeTransaction(
    gasRequired: WeightV2,
    transactionData: any,
    successMessage: string
  ) {
    const proposeTx = multisigContractPromise?.contract.tx.proposeTx;
    const tx = proposeTx?.(
      {
        gasLimit: gasRequired,
      },
      Object.values(transactionData)
    );

    if (!accountConnected?.address) return null;
    return await tx?.signAndSend(
      accountConnected?.address,
      {
        signer: accountConnected?.signer,
      },
      ({ status }) => {
        if (status.isInBlock) {
          setIsLoading(false);
          addNotification({
            message: successMessage,
            type: "success",
          });
          handleCancel();
        }
      }
    );
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
