import { Box, FormLabel, Typography } from "@mui/material";
import React from "react";

interface CodeBlockProps {
  code: string;
  label: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, label }) => {
  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        borderRadius: 1,
        p: 2,
        overflowX: "auto",
      }}
    >
      <FormLabel
        sx={{
          marginTop: "-2em",
          zIndex: 2,
          // backgroundColor: (theme) => theme.palette.background.default,
          position: "absolute",
          fontSize: "0.75em",
          width: "auto",
        }}
      >
        {label}
      </FormLabel>
      <Typography component="code" variant="body2">
        {code}
      </Typography>
    </Box>
  );
};

export default CodeBlock;
