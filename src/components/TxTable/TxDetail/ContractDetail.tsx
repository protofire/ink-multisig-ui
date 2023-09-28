import { Grid } from "@mui/material";
import React, { PropsWithChildren } from "react";

import { ColType, CustomGridItem } from "./styled";

type Props = { data: undefined };

const DEFAULT_COL_WIDTH = {
  name: {
    xs: 5,
    sm: 5,
    md: 5,
  },
  value: {
    xs: 6,
    sm: 6,
    md: 6,
  },
};

const GridCol: React.FC<PropsWithChildren<{ colType: keyof ColType }>> = ({
  children,
  colType,
}) => (
  <CustomGridItem colType={colType} defaultWidth={DEFAULT_COL_WIDTH}>
    {children}
  </CustomGridItem>
);

export const ContractDetail = (data: Props) => {
  return (
    <>
      <Grid container>
        <GridCol colType="name">Method name:</GridCol>
        <GridCol colType="value">STORE</GridCol>
        <GridCol colType="name">Arguments:</GridCol>
        <GridCol colType="value">15</GridCol>
      </Grid>

      {/* Start argument details*/}
      <Grid
        container
        sx={{
          marginTop: "0.5rem",
        }}
      >
        <GridCol colType="name">Argument Name(ARG Type)</GridCol>
        <GridCol colType="value">ARGUMENT value</GridCol>
        <GridCol colType="name">value(unit256):</GridCol>
        <GridCol colType="value">12</GridCol>
        <GridCol colType="name">value(unit256):</GridCol>
        <GridCol colType="value">12</GridCol>
        <GridCol colType="name">value(unit256):</GridCol>
        <GridCol colType="value">12</GridCol>
      </Grid>
    </>
  );
};
