import { Box, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface MyCardProps extends PropsWithChildren {
  title?: string;
  paragraph?: string;
}

export const MainContentCard: React.FC<MyCardProps> = ({
  title,
  paragraph,
  children,
}) => {
  return (
    <Box
      m={7}
      sx={{
        maxWidth: "100%",
        minHeight: "calc(100vh - 30rem)",
      }}
    >
      {title && (
        <Typography mb={2} fontWeight={300} variant="h2" component="div">
          {title}
        </Typography>
      )}
      {paragraph && (
        <Typography variant="body1" color="text.secondary">
          {paragraph}
        </Typography>
      )}
      {children}
    </Box>
  );
};
