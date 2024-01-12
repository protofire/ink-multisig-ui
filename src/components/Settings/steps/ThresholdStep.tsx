import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { ArrayOneOrMore } from "useink/dist/core";

import { StyledBox } from "@/components/StepperSignersAccount/styled";
import { Owner } from "@/domain/SignatoriesAccount";
import { ValidationError } from "@/hooks/xsignersAccount/useFormSignersAccountState";

function ThresholdStep({
  owners,
  threshold,
  handleThreshold,
  step,
  errors,
  setErrors,
}: {
  owners: ArrayOneOrMore<Owner>;
  step: number;
  threshold: number;
  handleThreshold: (threshold: number) => void;
  errors: Array<ValidationError[]>;
  setErrors: (errors: Array<ValidationError[]>) => void;
}) {
  useEffect(() => {
    const newErrors = [...errors];
    newErrors[step] = [];
    setErrors(newErrors);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleThresholdChange = (event: SelectChangeEvent<number>) => {
    handleThreshold(event.target.value as number);
  };
  return (
    <Box>
      <StyledBox
        mt={4}
        sx={{
          maxHeight: 300,
          overflowY: "auto",
        }}
        mb={5}
      >
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

export default ThresholdStep;
