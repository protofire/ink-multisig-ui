import { Box, Typography } from "@mui/material";

function ExecutionStep() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
          flexDirection: "column",
        }}
        mt={2}
        mb={1}
      >
        <Typography variant="h6">Lorempu sum i asds</Typography>
        <Typography variant="body1">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>
    </Box>
  );
}

export default ExecutionStep;
