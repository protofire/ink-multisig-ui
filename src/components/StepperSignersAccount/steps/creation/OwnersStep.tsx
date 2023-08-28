import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrayOneOrMore } from "useink/dist/core";

import { Owner } from "@/domain/SignatoriesAccount";
import { ValidationError } from "@/hooks/xsignersAccount/useFormSignersAccountState";

import { StyledBox } from "../../styled";

function OwnersStep({
  owners,
  threshold,
  handleOwners,
  handleThreshold,
  errors,
  setErrors,
  step,
}: {
  owners: ArrayOneOrMore<Owner>;
  threshold: number;
  handleOwners: (owners: ArrayOneOrMore<Owner>, step: number) => void;
  handleThreshold: (threshold: number, step: number) => void;
  errors: Array<ValidationError[]>;
  setErrors: (errors: Array<Array<ValidationError>>) => void;
  step: number;
}) {
  const handleOwnerChange = (
    index: number,
    value: string,
    field: "name" | "address"
  ) => {
    const newOwners = [...owners] as ArrayOneOrMore<Owner>;
    newOwners[index][field] = value;
    handleOwners(newOwners, step);
  };

  const addOwner = () => {
    const newOwners = [
      ...owners,
      { name: `Signer ${owners.length + 1}`, address: "" },
    ] as unknown as ArrayOneOrMore<Owner>;
    handleOwners(newOwners, step);
  };
  const removeOwner = (index: number) => {
    const filteredOwners = owners.filter(
      (_, i) => i !== index
    ) as ArrayOneOrMore<Owner>;
    const newErrors = [...errors];
    newErrors[step][index] = { error: false, message: "" };
    setErrors(newErrors);
    handleOwners(filteredOwners, step);
  };

  const handleThresholdChange = (event: SelectChangeEvent<number>) => {
    handleThreshold(event.target.value as number, step);
  };

  return (
    <Box>
      <Typography variant="h6" component="div" mt={1}>
        Set the owner wallets of your XSigners Account and how many need to
        confirm to execute a valid transaction.
      </Typography>
      <StyledBox
        mt={2}
        sx={{
          maxHeight: 300,
          overflowY: "auto",
        }}
        mb={5}
      >
        {owners.map((owner, index) => (
          <Box key={`Signer-${index}`} mb={1} mt={2}>
            <Box display="flex" gap={1} alignItems="center" mb={1}>
              <TextField
                label="Owner name"
                value={owner.name}
                onChange={(e) =>
                  handleOwnerChange(index, e.target.value, "name")
                }
              />

              <TextField
                fullWidth
                label="Owner address"
                value={owner.address}
                onChange={(e) =>
                  handleOwnerChange(index, e.target.value, "address")
                }
              />

              <IconButton
                disabled={index === 0}
                onClick={() => removeOwner(index)}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
            {errors[step][index]?.error && (
              <Typography variant="caption" color="red">
                {errors[step][index]?.message}
              </Typography>
            )}
          </Box>
        ))}
        <Button
          variant="text"
          sx={{ justifyContent: "flex-start", width: "150px", fontSize: 14 }}
          onClick={addOwner}
        >
          + Add new owner
        </Button>
      </StyledBox>
      <StyledBox>
        <Box mb={2}>
          <Typography
            fontWeight="bold"
            display="flex"
            alignItems="center"
            gap={0.5}
            component="div"
          >
            Threshold
            <Tooltip
              placement="right"
              title="Tooltip title for threshold field"
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Typography>
          <Typography variant="h6">
            Any transaction requires the confirmation of:
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Select value={threshold} onChange={handleThresholdChange}>
            {owners.map((owner, index) => (
              <MenuItem key={owner.name} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body1">
            out of {owners.length} owner(s)
          </Typography>
        </Box>
      </StyledBox>
    </Box>
  );
}

export default OwnersStep;
