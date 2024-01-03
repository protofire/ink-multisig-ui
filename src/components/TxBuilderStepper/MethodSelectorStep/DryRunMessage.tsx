import InfoIcon from "@mui/icons-material/Info";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/system";

import { MySkeleton } from "@/components/common/LoadingSkeleton";
import { DryRunExecutionResult } from "@/hooks/useDryRunExecution";

type Props = Omit<DryRunExecutionResult, "executeDryRun" | "gasRequired">;

export function DryRunMessage({ error, outcome, isRunning }: Props) {
  const isError = error !== undefined;
  const color = isError ? "#ff4d4f" : "#52c41a";
  const theme = useTheme();

  if (!isError && !outcome && !isRunning) {
    return null;
  }

  if (isRunning) {
    return (
      <MySkeleton
        variant="text"
        height={20}
        width={220}
        sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }}
      />
    );
  }

  return (
    <Stack direction="row" gap={1}>
      <InfoIcon fontSize="small" color={isError ? "error" : "success"} />
      <Typography variant="body1" color={color}>
        {outcome}
      </Typography>
    </Stack>
  );
}
