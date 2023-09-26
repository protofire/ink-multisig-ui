import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, TextField, Tooltip, Typography } from "@mui/material";
import { ArrayOneOrMore } from "useink/dist/core";

import { Owner } from "@/domain/SignatoriesAccount";
import { ValidationError } from "@/hooks/xsignersAccount/useFormSignersAccountState";

import { AccountSigner } from "../../AccountSigner";
import { StyledBox } from "../../styled";

function OwnersStep({
  handleOwners,
  errors,
  step,
  owners,
  threshold,
}: {
  handleOwners: (owners: ArrayOneOrMore<Owner>, step: number) => void;
  errors: Array<ValidationError[]>;
  setErrors: (errors: Array<Array<ValidationError>>) => void;
  step: number;
  owners: ArrayOneOrMore<Owner>;
  threshold: number;
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
              <Box ml={1}>
                <AccountSigner
                  key={owner.address}
                  name={owner.name}
                  address={owner.address}
                  truncateAmount={16}
                />
              </Box>
            </Box>
            {errors[step][index]?.error && (
              <Typography variant="caption" color="red">
                {errors[step][index]?.message}
              </Typography>
            )}
          </Box>
        ))}
      </StyledBox>
      <StyledBox>
        <Box mb={1}>
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
          <Typography variant="body1">
            {threshold} out of {owners.length} owner(s)
          </Typography>
        </Box>
      </StyledBox>
    </Box>
  );
}

export default OwnersStep;
