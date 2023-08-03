import { Card, CardContent, Divider, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

import { BoxContenCentered } from "@/components/common/muiExtended";

interface MyCardProps extends PropsWithChildren {
  title?: string;
  paragraph?: string;
}

export const MainContentCard: React.FC<MyCardProps> = ({
  title,
  paragraph,
  children,
}) => {
  const isThereTitleOrParagraph = title || paragraph;

  return (
    <Card
      sx={{
        maxWidth: "100%",
        minHeight: "calc(100vh - 30rem)",
        mt: 3,
        mb: 3,
        ml: 2,
        mr: 2,
      }}
    >
      <CardContent>
        {title && (
          <Typography gutterBottom variant="h1" color="primary" component="div">
            {title}
          </Typography>
        )}
        {paragraph && (
          <Typography variant="body1" color="text.secondary">
            {paragraph}
          </Typography>
        )}
        {isThereTitleOrParagraph && <Divider sx={{ my: 2 }} />}
        <BoxContenCentered>{children}</BoxContenCentered>
      </CardContent>
    </Card>
  );
};
