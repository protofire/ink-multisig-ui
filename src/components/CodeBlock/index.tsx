import { Box, Typography } from "@mui/material";
import React from "react";

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
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
      <Typography component="code" variant="body2">
        {code}
      </Typography>
    </Box>
  );
};

export default CodeBlock;
