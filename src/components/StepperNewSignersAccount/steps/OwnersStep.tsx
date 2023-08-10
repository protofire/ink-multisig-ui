import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ArrayOneOrMore } from "useink/dist/core";

import { Owner } from "@/domain/SignatoriesAccount";
import { ValidationError } from "@/hooks/signatoriesAccount/useFormSignersAccountState";

import { StyledBox } from "../styled";

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
      { name: `Owner ${owners.length + 1}`, address: "" },
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
      <StyledBox
        mt={2}
        sx={{
          maxHeight: 300,
          overflowY: "auto",
        }}
        mb={1}
      >
        <Typography variant="body1" component="div">
          Add initial multisig owners
        </Typography>
        <Typography variant="caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing
        </Typography>
        {owners.map((owner, index) => (
          <Box key={`Owner-${index}`} mb={2} mt={2}>
            <Box sx={{ display: "flex", gap: "1rem" }} mb={1}>
              <TextField
                label="Owner name"
                value={owner.name}
                onChange={(e) =>
                  handleOwnerChange(index, e.target.value, "name")
                }
              />
              <TextField
                label="Owner address"
                value={owner.address}
                onChange={(e) =>
                  handleOwnerChange(index, e.target.value, "address")
                }
              />
              <Button disabled={index === 0} onClick={() => removeOwner(index)}>
                Remove
              </Button>
            </Box>
            {errors[step][index]?.error && (
              <Typography variant="caption" color="red">
                {errors[step][index]?.message}
              </Typography>
            )}
          </Box>
        ))}
        <Button sx={{ justifyContent: "flex-start" }} onClick={addOwner}>
          Add Owner
        </Button>
      </StyledBox>
      <StyledBox>
        <Box mb={2}>
          <Typography variant="body1" component="div">
            Confirmation threshold
          </Typography>
          <Typography variant="caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing
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
