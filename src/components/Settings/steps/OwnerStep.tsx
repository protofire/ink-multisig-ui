import { Box, TextField, Typography } from "@mui/material";
import { ArrayOneOrMore } from "useink/dist/core";

import { StyledBox } from "@/components/StepperSignersAccount/styled";
import { Owner } from "@/domain/SignatoriesAccount";
import { ValidationError } from "@/hooks/xsignersAccount/useFormSignersAccountState";

function OwnerStep({
  owners,
  handleOwners,
  step,
  errors,
}: {
  owners: ArrayOneOrMore<Owner>;
  handleOwners: (owners: ArrayOneOrMore<Owner>, step: number) => void;
  step: number;
  errors: Array<ValidationError[]>;
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

  return (
    <Box>
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
            </Box>
            {errors[step][index]?.error && (
              <Typography variant="caption" color="red">
                {errors[step][index]?.message}
              </Typography>
            )}
          </Box>
        ))}
      </StyledBox>
    </Box>
  );
}

export default OwnerStep;
