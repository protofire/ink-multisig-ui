import { Grid, GridProps, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

export const DEFAULT_COL_WIDTH = {
  name: {
    xs: 3,
    sm: 3,
    md: 3,
  },
  value: {
    xs: 9,
    sm: 9,
    md: 9,
  },
};

export type ColType = typeof DEFAULT_COL_WIDTH;

type CustomGridProps = {
  colType: keyof ColType;
  defaultWidth?: ColType;
  gridProps?: GridProps;
};

export const CustomGridItem: React.FC<
  PropsWithChildren<CustomGridProps & GridProps>
> = ({ children, colType, defaultWidth = DEFAULT_COL_WIDTH, gridProps }) => {
  const type = defaultWidth[colType];
  const TypographyComponent = {
    name: (
      <Typography color="#837376" sx={{ padding: "0.6em 0" }}>
        {children}
      </Typography>
    ),
    value: (
      <Typography
        sx={{
          minWidth: 0,
          minHeight: 0,
          wordWrap: "break-word",
          wordBreak: "break-all",
          maxWidth: "100%",
          padding: "0.6rem 0",
        }}
      >
        {children}
      </Typography>
    ),
  };
  const _children =
    typeof children === "string" ? TypographyComponent[colType] : children;
  return (
    <Grid item {...type} {...gridProps}>
      {_children}
    </Grid>
  );
};
