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
      sx={{
        maxWidth: "100%",
        margin: { xs: 1, sm: 2, md: 3, lg: 4, xl: 10 },
        marginTop: { xs: 8, sm: 10, md: 10, lg: 12, xl: 20 },
        ...sx,
      }}
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
