import CloseIcon from "@mui/icons-material/Close";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { ArrayOneOrMore } from "useink/dist/core";

import { useAppNotificationContext } from "@/components/AppToastNotification/AppNotificationsContext";
import NetworkBadge from "@/components/NetworkBadge";
import { AccountSigner } from "@/components/StepperSignersAccount/AccountSigner";
import { getChain } from "@/config/chain";
import { Owner, SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";

export default function ManageOwners({
  owners,
  selectedMultisig,
  handleAddOwner,
}: {
  owners?: ArrayOneOrMore<Owner>;
  selectedMultisig?: SignatoriesAccount;
  handleAddOwner: () => void;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [ownersList, setOwnersList] = React.useState<
    ArrayOneOrMore<Owner> | undefined
  >(owners);
  const [currentOwner, setCurrentOwner] = React.useState<Owner>({} as Owner);
  const { setXsigner } = useSetXsignerSelected();
  const { addNotification } = useAppNotificationContext();
  const { logo, name: networkName } = getChain(selectedMultisig?.networkId);

  React.useEffect(() => {
    setOwnersList(owners);
  }, [owners]);

  const handleEdit = (owner: Owner) => {
    setCurrentOwner(owner);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentOwner({} as Owner);
    setOpen(false);
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
      owners: newOwners as ArrayOneOrMore<Owner>,
    });

    setOwnersList(newOwners as ArrayOneOrMore<Owner>);
    handleClose();
    addNotification({
      message: "Owner name updated successfully",
      type: "success",
    });
  };

  return (
    <Box display="flex">
      <Modal
        open={open}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
            <TextField
              label="Address"
              autoFocus
              value={currentOwner?.address}
              fullWidth
              margin="normal"
              inputProps={{ readOnly: true }}
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
      <Box minWidth={300}>
        <Typography variant="h5">Manage Owners</Typography>
      </Box>
      <Box>
        <Typography variant="body2">
          Add, remove or ename existing owners. Owner names are only stored
          locally and will never be shared with us or any third parties.
        </Typography>
        <Box mt={2}>
          {ownersList?.map((owner) => (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              key={owner?.address as string}
            >
              <AccountSigner
                name={owner?.name as string}
                address={owner?.address as string}
                truncateAmount={16}
              />
              <Box display="flex" gap={0.25}>
                <CreateOutlinedIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleEdit(owner)}
                />
                <DeleteOutlinedIcon sx={{ cursor: "pointer" }} />
              </Box>
            </Box>
          ))}
          <Divider sx={{ marginTop: "1rem" }} />
        </Box>
        <Button
          variant="text"
          sx={{
            justifyContent: "flex-start",
            width: "150px",
            fontSize: 14,
            marginTop: "1rem",
          }}
          onClick={handleAddOwner}
        >
          + Add new owner
        </Button>
      </Box>
    </Box>
  );
}
