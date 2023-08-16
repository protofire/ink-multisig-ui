import { Box, BoxProps, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

import { BoxContentCentered } from "@/components/common/muiExtended";

interface MyCardProps extends PropsWithChildren {
  title?: string;
  paragraph?: string;
  styles?: BoxProps;
}

export const MainContentCard: React.FC<MyCardProps> = ({
  title,
  paragraph,
  children,
  styles,
}) => {
  return (
    <BoxContentCentered
      m={7}
      sx={{
        maxWidth: "100%",
        minHeight: "calc(100vh - 30rem)",
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
