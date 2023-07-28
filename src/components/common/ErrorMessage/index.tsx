import Box from "@mui/material/Box";
import * as React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "error.main",
        color: "error.main",
        padding: 1,
        borderRadius: 1,
        marginBottom: 2,
      }}
    >
      {message}
    </Box>
  );
}
