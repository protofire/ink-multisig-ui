import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
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
  const ownersAmount = useRef(owners.length);
  const handleOwnerChange = (
    index: number,
    value: string,
    field: "name" | "address"
  ) => {
    const newOwners = [...owners] as ArrayOneOrMore<Owner>;
    if (!newOwners[index]) {
      newOwners[index] = {
        name: `Signer ${ownersAmount.current + 1}`,
      } as Owner;
    }
    newOwners[index][field] = value;
    handleOwners(newOwners, step);
  };

  useEffect(() => {
    const newOwners = [...owners] as ArrayOneOrMore<Owner>;
    if (newOwners[ownersAmount.current]) return;
    newOwners[ownersAmount.current] = {
      name: `Signer ${ownersAmount.current + 1}`,
    } as Owner;
    handleOwners(newOwners, step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleOwners, step]);

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
        <Box key={`Signer-${ownersAmount.current + 1}`} mb={1} mt={2}>
          <Box display="flex" gap={1} alignItems="center" mb={1}>
            <TextField
              label="Owner name"
              value={
                owners[ownersAmount.current]?.name === undefined
                  ? `Signer ${ownersAmount.current + 1}`
                  : owners[ownersAmount.current]?.name
              }
              onChange={(e) =>
                handleOwnerChange(ownersAmount.current, e.target.value, "name")
              }
            />

            <TextField
              fullWidth
              label="Owner address"
              value={owners[ownersAmount.current]?.address || ""}
              onChange={(e) =>
                handleOwnerChange(
                  ownersAmount.current,
                  e.target.value,
                  "address"
                )
              }
            />
          </Box>
          {errors[step][1]?.error && (
            <Typography variant="caption" color="red">
              {errors[step][1]?.message}
            </Typography>
          )}
        </Box>
      </StyledBox>
    </Box>
  );
}

export default OwnerStep;
