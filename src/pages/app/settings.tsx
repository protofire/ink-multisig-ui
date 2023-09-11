import { Box, Typography } from "@mui/material";

export default function SettingsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Typography variant="h3" color="primary">
        Settings
      </Typography>
    </Box>
  );
}
