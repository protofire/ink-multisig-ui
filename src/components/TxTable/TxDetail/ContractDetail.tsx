import styled from "@emotion/styled";
import { Grid, GridProps, Typography } from "@mui/material";
import React from "react";

import { StyledTypography } from "./styled";

type Props = { data: undefined };

const TabGrid = styled(Grid)<GridProps>(() => ({
  paddingLeft: "2rem",
}));

const detailNameWidth = {
  xs: 5,
  sm: 5,
  md: 5,
};

const detailValueWidth = {
  xs: 6,
  sm: 6,
  md: 6,
};

export const ContractDetail = (data: Props) => {
  return (
    <>
      <>
        <Grid container>
          <Grid item {...detailNameWidth}>
            <StyledTypography>Method name:</StyledTypography>
          </Grid>
          <Grid item {...detailValueWidth}>
            <Typography>STORE</Typography>
          </Grid>
          <Grid item {...detailNameWidth}>
            <StyledTypography>Arguments: </StyledTypography>
          </Grid>
          <Grid item {...detailValueWidth}>
            <Typography>15</Typography>
          </Grid>
        </Grid>

        {/* Start argument details*/}
        <Grid
          container
          sx={{
            marginTop: "0.5rem",
          }}
        >
          <TabGrid {...detailNameWidth}>
            <StyledTypography>Argument Name(ARG Type) </StyledTypography>
          </TabGrid>
          <Grid item {...detailValueWidth}>
            <Typography>ARGUMENT value</Typography>
          </Grid>
          <TabGrid {...detailNameWidth}>
            <StyledTypography>value(unit256): </StyledTypography>
          </TabGrid>
          <Grid item {...detailValueWidth}>
            <Typography>12</Typography>
          </Grid>
          <TabGrid {...detailNameWidth}>
            <StyledTypography>value(unit256): </StyledTypography>
          </TabGrid>
          <Grid item {...detailValueWidth}>
            <Typography>12</Typography>
          </Grid>
          <TabGrid {...detailNameWidth}>
            <StyledTypography>value(unit256): </StyledTypography>
          </TabGrid>
          <Grid item {...detailValueWidth}>
            <Typography>12</Typography>
          </Grid>
        </Grid>
      </>
    </>
  );
};
