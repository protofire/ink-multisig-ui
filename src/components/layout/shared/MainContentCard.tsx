import { Box, BoxProps, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

import { BoxContentCentered } from "@/components/common/muiExtended";

interface MyCardProps extends PropsWithChildren<BoxProps> {
  title?: string;
  paragraph?: string;
  stylesContainer?: BoxProps;
}

export const MainContentCard: React.FC<MyCardProps> = ({
  title,
  paragraph,
  children,
  stylesContainer: styles,
  sx,
}) => {
  return (
    <BoxContentCentered
      m={7}
      sx={{ maxWidth: "100%", minHeight: "calc(100vh - 30rem)", ...sx }}
    >
      <BoxContentCentered {...styles}>
        <Box>
          {title && (
            <Typography mb={2} fontWeight={300} variant="h2" component="div">
              {title}
            </Typography>
          )}
          {paragraph && (
            <Typography mb={2} variant="body1" color="text.secondary">
              {paragraph}
            </Typography>
          )}
        </Box>
        {children}
      </BoxContentCentered>
    </BoxContentCentered>
  );
};
