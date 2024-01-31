import BookIcon from "@mui/icons-material/Book";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import router from "next/router";
import * as React from "react";

import { useAppNotificationContext } from "@/components/AppToastNotification/AppNotificationsContext";
import { LoadingButton } from "@/components/common/LoadingButton";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import NetworkBadge from "@/components/NetworkBadge";
import { AccountSigner } from "@/components/StepperSignersAccount/AccountSigner";
import { getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import {
  useNameAddressBookContext,
  YOU_TEXT,
} from "@/context/NameInAddressBookContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { Owner, SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";

interface Props {
  selectedMultisig?: SignatoriesAccount;
  handleAddOwner: () => void;
  handleDeleteOwner: (owner: Owner) => void;
  isDeletedLoading?: boolean;
}

export default function ManageOwners({
  selectedMultisig,
  handleAddOwner,
  handleDeleteOwner,
  isDeletedLoading = false,
}: Props) {
  const { accountConnected } = usePolkadotContext();
  const theme = useTheme();
  const [open, setOpen] = React.useState({ edit: false, delete: false });
  const { owners } = selectedMultisig || {};
  const [ownersList, setOwnersList] = React.useState<
    SignatoriesAccount["owners"] | undefined
  >(owners);
  const [currentOwner, setCurrentOwner] = React.useState<Owner>({} as Owner);
  const { setXsigner } = useSetXsignerSelected();
  const { addNotification } = useAppNotificationContext();
  const { logo, name: networkName } = getChain(selectedMultisig?.networkId);
  const { findInAddressBook } = useNameAddressBookContext();

  React.useEffect(() => {
    setOwnersList(owners);
  }, [owners]);

  const handleEdit = (owner: Owner) => {
    setCurrentOwner(owner);
    setOpen({ edit: true, delete: false });
  };

  const handleClose = () => {
    setCurrentOwner({} as Owner);
    setOpen({ edit: false, delete: false });
  };

  const handleLocalDelete = (owner: Owner) => {
    if (owners?.length === 1) return;
    setCurrentOwner(owner);
    setOpen({ edit: false, delete: true });
  };

  const handleSave = async () => {
    if (!ownersList?.length || !selectedMultisig) return;

    const updatedOwners = ownersList.filter(
      (owner) => owner.address !== currentOwner?.address
    );
    const newOwners =
      updatedOwners.length > 0
        ? [...updatedOwners, currentOwner]
        : [currentOwner];

    await setXsigner({
      ...selectedMultisig,
      owners: newOwners as SignatoriesAccount["owners"],
    });

    setOwnersList(newOwners as SignatoriesAccount["owners"]);
    handleClose();
    addNotification({
      message: "Owner name updated successfully",
      type: "success",
    });
  };

  return (
    <Box display="flex">
      <Modal
        open={open.edit}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={2}
          width={500}
          sx={{ backgroundColor: theme.palette.grey.A100 }}
        >
          <Box
            display="flex"
            flexDirection="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
            pl={2}
          >
            <Typography variant="h4" color="primary">
              Edit owner name
            </Typography>
            <Typography variant="h6" onClick={handleClose}>
              <CloseIcon />
            </Typography>
          </Box>
          <Box
            mt={4}
            display="flex"
            gap={2.25}
            p={2}
            flexDirection="column"
            width="100%"
          >
            <TextField
              label="Name"
              autoFocus
              value={currentOwner?.name}
              onChange={(e) =>
                setCurrentOwner({ ...currentOwner, name: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <AccountSigner
              name=""
              address={currentOwner?.address as string}
              truncateAmount={16}
            />
            <Box display="flex" alignItems="center" gap={1.25}>
              <Typography variant="body2" component="p">
                This address is available on
              </Typography>
              <NetworkBadge
                name={networkName}
                logo={logo.src}
                logoSize={{ width: 20, height: 20 }}
                description={logo.alt}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={3}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{ width: 94 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                disabled={!currentOwner?.name}
                sx={{ width: 134 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={open.delete}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={2}
          width={500}
          sx={{ backgroundColor: theme.palette.grey.A100 }}
        >
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
            pl={2}
          >
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5" color="primary">
                Are you sure you want to delete this owner?
              </Typography>
              <Typography variant="h6" onClick={handleClose}>
                <CloseIcon />
              </Typography>
            </Box>
            <Box mt={3} mb={2}>
              <AccountSigner
                key={currentOwner.address}
                name={currentOwner.name}
                address={currentOwner.address}
                truncateAmount={12}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width={300}
            mt={3}
          >
            <Button onClick={handleClose} variant="outlined" sx={{ width: 94 }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen({ edit: false, delete: false });
                handleDeleteOwner(currentOwner);
              }}
              variant="contained"
              sx={{ width: 134 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box minWidth={300}>
        <Typography variant="h5">Manage Owners</Typography>
      </Box>
      <Box>
        <Typography variant="body2">
          Add, remove or ename existing owners. Owner names are only stored
          locally and will never be shared with us or any third parties.
        </Typography>
        <Box mt={2}>
          {ownersList === undefined && (
            <LoadingSkeleton count={5} width={"100%"} />
          )}
          {ownersList?.map((owner) => {
            const inAddressBook = findInAddressBook(owner.address);
            const isYou = accountConnected?.address === owner.address;
            const signerName = isYou
              ? `${owner.name} (${YOU_TEXT})`
              : inAddressBook || owner.name;

            return (
              <Box
                display="flex"
                flexDirection="column"
                key={owner?.address as string}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <AccountSigner
                    name={signerName}
                    address={owner?.address as string}
                    truncateAmount={16}
                  />
                  <Box display="flex" gap={0.25}>
                    {inAddressBook ? (
                      <Tooltip title="Go to address book">
                        <BookIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => router.replace(ROUTES.AddressBook)}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Edit name">
                        <EditOutlinedIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleEdit(owner)}
                        />
                      </Tooltip>
                    )}
                    {isDeletedLoading &&
                    currentOwner.address === owner.address ? (
                      <CircularProgress color="secondary" size={20} />
                    ) : (
                      <DeleteOutlinedIcon
                        onClick={() =>
                          !isDeletedLoading && handleLocalDelete(owner)
                        }
                        sx={{
                          cursor:
                            owners?.length === 1 || isDeletedLoading
                              ? "not-allowed"
                              : "pointer",
                        }}
                        color={
                          owners?.length === 1 || isDeletedLoading
                            ? "disabled"
                            : "inherit"
                        }
                      />
                    )}
                  </Box>
                </Box>
                <Box>
                  <Divider sx={{ margin: "0.5rem 0" }} />
                </Box>
              </Box>
            );
          })}
        </Box>
        <LoadingButton
          variant="text"
          sx={{
            justifyContent: "flex-start",
            width: "150px",
            fontSize: 14,
            marginTop: "1rem",
          }}
          {...(owners === undefined
            ? { isLoading: true }
            : { onClick: handleAddOwner })}
        >
          + Add new owner
        </LoadingButton>
      </Box>
    </Box>
  );
}
